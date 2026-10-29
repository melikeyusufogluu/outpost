"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useUpgradeDialog } from "./UpgradeDialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const WorkspaceDialog = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a workspace</DialogTitle>
        </DialogHeader>
        <WorkspaceForm onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

const WorkspaceForm = ({ onDone }: { onDone: () => void }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const openUpgrade = useUpgradeDialog();

  const handleSubmit = () => {};

  return (
    <>
      <div>
        <Label htmlFor="workspace-name">Name</Label>
        <Input
          id="workspace-name"
          placeholder="Q1 Marketing Launch"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
      </div>

      <div>
        <Label htmlFor="workspace-description">
          Description <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="workspace-description"
          placeholder="What's this workspace for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </div>
    </>
  );
};

export default WorkspaceDialog;
