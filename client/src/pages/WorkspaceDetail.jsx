import React from 'react';
import { useParams } from 'react-router-dom';
import Workspace from './Workspace';

const WorkspaceDetail = () => {
 const { id } = useParams();
 
 // In a real app, we would fetch the specific workspace data here based on ID
 // For now, we reuse the generic Workspace component which uses mock data
 
 return <Workspace workspaceId={id} />;
};

export default WorkspaceDetail;
