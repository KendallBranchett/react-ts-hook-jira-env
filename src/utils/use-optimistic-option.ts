import { QueryKey, useQueryClient } from "react-query";
import { Project } from "screens/project-list/list";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();

  return {
    onSuccess: () => queryClient.invalidateQueries("projects"),
    async onMutate(target: Partial<Project>) {
      const previousItems = queryClient.getQueriesData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return (
          old?.map((project) =>
            project.id === target.id ? { ...project, ...target } : project
          ) || []
        );
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as unknown as { previousItems: Project[] }).previousItems
      );
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
