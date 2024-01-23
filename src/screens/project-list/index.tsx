import React from "react";
import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import { useState } from "react";
import { ButtonNoPadding, ErrorBox } from "../../components/lib";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Row } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.2rem;
`;

ProjectListScreen.whyDidYouRender = false;
