import { useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

//第一个<D>是用于函数泛型，表示该函数接受一个泛型参数 D；第二个State<D>是指定 State 类型的泛型参数
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(() => () => {});

  const setData = (data: D) =>
    setState({
      error: null,
      data,
      stat: "success",
    });

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: "error",
    });

  //run用来触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then()) {
      throw new Error("请传入Promise类型数据");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, stat: "loading" });
    return (
      promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        //catch会消化异常，如果不主动抛出，外面则接收不到异常
        .catch((error: Error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        })
    );
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    //retry被调用时，重新执行run，继而使state刷新
    retry,
    ...state,
  };
};
