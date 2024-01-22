import React from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const { isLoading, error, data: list, retry } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.2rem;
`;

ProjectListScreen.whyDidYouRender = false;
