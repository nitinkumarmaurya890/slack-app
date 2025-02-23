interface WorkspaceIdPagePros {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPagePros) => {
  return <div>ID: {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
