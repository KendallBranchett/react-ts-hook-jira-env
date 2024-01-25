import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  console.log("currentProject", currentProject);
  console.log("kanbans", kanbans);

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
        <CreateKanban />
      </ColumnsContainer>
      <TaskModal/>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
