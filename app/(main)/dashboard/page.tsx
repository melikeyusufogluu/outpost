import { checkUser } from "@/actions/check-user";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const user = await checkUser();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">
        Welcome, {user.name ?? user.email}
      </h1>
      <p className="pt-2 text-sm text-muted-foreground">
        Your user id in our database is: {user.id}
      </p>
    </div>
  );
};

export default DashboardPage;
