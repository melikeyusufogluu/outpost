"use client";

import { WorkspaceCard, WorkspaceCardData } from "@/components/WorkspaceCard";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  type DropResult,
} from "@hello-pangea/dnd";
import { WORKSPACE_STATUSES } from "@/lib/workspace-status";
import { WorkspaceStatus } from "@/lib/generated/prisma/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useFetch } from "@/hooks/use-fetch";
import { deleteWorkspace, moveWorkspace } from "@/actions/workspace";
import { toast } from "sonner";

type BoardWorkspace = WorkspaceCardData & { position: number };

const positionBetween = (before?: BoardWorkspace, after?: BoardWorkspace) => {
  if (before && after) return (before.position + after.position) / 2;
  if (before) return before.position + 1;
  if (after) return after.position - 1;
  return 0;
};

const columnItems = (workspaces: BoardWorkspace[], status: WorkspaceStatus) => {
  return workspaces
    .filter((w) => w.status === status)
    .sort((a, b) => a.position - b.position);
};

const WorkspaceBoard = ({ workspaces }: { workspaces: BoardWorkspace[] }) => {
  const [items, setItems] = useState(workspaces);
  const [prevWorkspaces, setPrevWorkspaces] = useState(workspaces);

  const [selected, setSelected] = useState<BoardWorkspace | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { fn: deleteWorkspaceFn, loading: isDeleting } =
    useFetch(deleteWorkspace);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selected) return;
    await deleteWorkspaceFn(selected.id);
    setDeleteOpen(false);
  };

  if (workspaces !== prevWorkspaces) {
    setItems(workspaces);
    setPrevWorkspaces(workspaces);
  }

  const handleDragEnd = async ({
    draggableId,
    source,
    destination,
  }: DropResult) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const status = destination.droppableId as WorkspaceStatus;
    const target = columnItems(items, status).filter(
      (w) => w.id !== draggableId,
    );
    const position = positionBetween(
      target[destination.index - 1],
      target[destination.index],
    );

    const previous = items;
    setItems((items) =>
      items.map((w) => (w.id === draggableId ? { ...w, status, position } : w)),
    );

    try {
      await moveWorkspace(draggableId, status, position);
    } catch (error) {
      setItems(previous);
      toast.error("Couldn't move workspace.");
    }
  };

  const confirmDelete = (workspace: BoardWorkspace) => {
    setSelected(workspace);
    setDeleteOpen(true);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-4 md:grid-cols-2 xl:grid-cols-4">
        {WORKSPACE_STATUSES.map((column) => {
          const columnWorkspaces = columnItems(items, column.status);
          return (
            <div
              key={column.status}
              className="flex flex-col rounded=lg bg-white/3"
            >
              <div className="flex items-center gap-2 px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {column.title}
                <span className="font-normal">{columnWorkspaces.length}</span>
              </div>

              <Droppable droppableId={column.status}>
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot,
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex min-h-40 flex-1 flex-col gap-1.5 rounede-b-lg p-2 transition-colors ${snapshot.isDraggingOver ? "bg-primary/5" : ""}`}
                  >
                    {columnWorkspaces.map((workspace, index) => (
                      <Draggable
                        key={workspace.id}
                        draggableId={workspace.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <WorkspaceCard
                              workspace={workspace}
                              highlighted={snapshot.isDragging}
                              actions={
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant={"ghost"}
                                      size={"icon"}
                                      aria-label="Workspace options"
                                      className="absolute top-2 right-2 size-7 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100"
                                    >
                                      <MoreHorizontal className="size-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem
                                        variant="destructive"
                                        onSelect={() =>
                                          confirmDelete(workspace)
                                        }
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{selected?.name}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the workspace, including its doc and
              canvas. It can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={"destructive"}
              onClick={handleDelete}
              disabled={!!isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DragDropContext>
  );
};

export default WorkspaceBoard;
