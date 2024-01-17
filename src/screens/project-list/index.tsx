import React from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 1000);
  const client = useHttp();
  const { run, isLoading, error, data: list } = useAsync<Project[]>();

  useMount(() => {
    client("users").then(setUsers);
  });

  useEffect(() => {
    run(client("projects", { data: cleanObject(debouncedParam) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.2rem;
`;
