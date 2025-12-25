import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AddTeamMemberModalProps {
  trigger?: React.ReactNode;
}

export function AddTeamMemberModal({ trigger }: AddTeamMemberModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: addTeamMember, isLoading } = useMutation({
    mutationFn: async (memberData: any) => {
      const res = await apiRequest("POST", "/api/team", memberData);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add team member");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({
        title: "Team member added",
        description: "The team member has been added successfully.",
      });
      setOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setDescription("");
    setImageUrl("");
    setOrder("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeamMember({
      name,
      email,
      role,
      description,
      imageUrl,
      order: order ? parseInt(order) : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Team Member</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to the E-Cell team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="President">President</SelectItem>
                <SelectItem value="Vice President">Vice President</SelectItem>
                <SelectItem value="Secretary">Secretary</SelectItem>
                <SelectItem value="Treasurer">Treasurer</SelectItem>
                <SelectItem value="Technical Head">Technical Head</SelectItem>
                <SelectItem value="Marketing Head">Marketing Head</SelectItem>
                <SelectItem value="Events Head">Events Head</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Profile Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Display Order (optional)</Label>
            <Input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              min="0"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 