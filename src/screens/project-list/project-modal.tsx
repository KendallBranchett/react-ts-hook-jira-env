import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
