import React, { Component } from "React";

import Layout from "@/components/Layout";
import Todo from "@/components/Todo";

export default function() {
  return (
    <div>
      <Layout>
        <Todo />
      </Layout>
    </div>
  );
}
