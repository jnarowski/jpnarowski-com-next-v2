import {
  defineWorkflow,
  type CmdImplementSpecResponse,
  type CmdReviewSpecImplementationResponse,
} from "agentcmd-workflows";
import { motion } from "motion/react";
import { getAllArticles } from "../../../src/lib/blog";
/**
 * Example workflow demonstrating automatic workspace lifecycle.
 * Workspace setup and cleanup happen automatically via _system_setup and _system_finalize.
 * Spec file resolution happens automatically in system setup phase.
 */

export default defineWorkflow(
  {
    id: "implement-review-workflow",
    name: "Implement Review Workflow",
    description: "Implements a spec file and reviews the implementation",
    phases: [
      { id: "setup", label: "Setup" },
      { id: "implement", label: "Implement" },
      { id: "review", label: "Review" },
    ],
  },
  async ({ event, step }) => {
    const { workingDir, specFile } = event.data;

    console.log("motion", motion);
    console.log("getAllArticles", getAllArticles());

    await step.phase("implement", async () => {
      const response = await step.agent<CmdImplementSpecResponse>(
        "implement-spec",
        {
          agent: "claude",
          prompt: "say hello",
          workingDir,
        }
      );

      return response;
    });

    await step.phase("review", async () => {
      const response = await step.agent<CmdReviewSpecImplementationResponse>(
        "review-spec-implementation",
        {
          agent: "claude",
          json: true,
          prompt: "another thing",
          workingDir,
        }
      );

      return response;
    });
  }
);
