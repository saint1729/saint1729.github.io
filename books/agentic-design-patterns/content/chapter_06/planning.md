---
chapter: 06
title: Planning
author: Sai Nikhil
date: 2026-02-03
tags: [planning]
---

# Planning

In the context of AI, it's helpful to think of a planning agent as a specialist to whom you delegate a complex goal. When you ask it to "organize a team offsite," you are defining the "what"—the objective and its constraints—but not the "how". The agent's core task is to autonomously chart a course to that goal. It must first understand the initial state (e.g., budget, number of participants, desired dates) and the goal state (a successfully booked offsite), and then discover the optimal sequence of actions to connect them. The plan is not known in advance; it is created in response to the request.

It is crucial to recognize the trade-off between flexibility and predictability. Dynamic planning is a specific tool, not a universal solution. When a problem's solution is already well-understood and repeatable, constraining the agent to a predetermined, fixed workflow is more effective. This approach limits the agent's autonomy to reduce uncertainty and the risk of unpredictable behavior, guaranteeing a reliable and consistent outcome. Therefore, the decision to use a planning agent versus a simple task-execution agent hinges on a single question: does the "how" need to be discovered, or is it already known?

## Practical Applications & Use Cases

1. Autonomous systems
2. Procedural Task Automation such as onboarding a new employee
3. Robotoics and Autonomous navigation
4. Structured information synthesis
5. Customer support

In essence, the Planning pattern allows an agent to move beyond simple, reactive actions to goal-oriented behavior. It provides the logical framework necessary to solve problems that require a coherent sequence of interdependent operations.

## Summary

**What:** Complex problems often cannot be solved with a single action and require foresight to achieve a desired outcome. Without a structured approach, an agentic system struggles to handle multifaceted requests that involve multiple steps and dependencies. This makes it difficult to break down high-level objectives into a manageable series of smaller, executable tasks. Consequently, the system fails to strategize effectively, leading to incomplete or incorrect results when faced with intricate goals.

**Why:** The Planning pattern offers a standardized solution by having an agentic system first create a coherent plan to address a goal. It involves decomposing a high-level objective into a sequence of smaller, actionable steps or sub-goals. This allows the system to manage complex workflows, orchestrate various tools, and handle dependencies in a logical order. LLMs are particularly well-suited for this, as they can generate plausible and effective plans based on their vast training data. This structured approach transforms a simple reactive agent into a strategic executor that can proactively work towards a complex objective and even adapt its plan if necessary.

**Rule of thumb:** Use this pattern when a user's request is too complex to be handled by a single action or tool. It is ideal for automating multi-step processes, such as generating a detailed research report, onboarding a new employee, or executing a competitive analysis. Apply the Planning pattern whenever a task requires a sequence of interdependent operations to reach a final, synthesized outcome.

## Key Takeaways

- Planning enables agents to break down complex goals into actionable, sequential steps.
- It is essential for handling multi-step tasks, workflow automation, and navigating complex environments.
- LLMs can perform planning by generating step-by-step approaches based on task descriptions.
- Explicitly prompting or designing tasks to require planning steps encourages this behavior in agent frameworks.
- Google Deep Research is an agent analyzing on our behalf sources obtained using Google Search as a tool. It reflects, plans, and executes.


---

# Code Examples

## LangChain Implementation

**planning_openai.py**

```python
import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file for security

# ----------------------------
# Initialize the client
# ----------------------------
# Replace with your API key OR rely on OPENAI_API_KEY env var
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# ----------------------------
# System + User messages
# ----------------------------
system_message = """
You are a professional researcher preparing a structured, data-driven report.
Focus on data-rich insights, use reliable sources, and include inline citations.
"""

user_query = "Research the economic impact of semaglutide on global healthcare systems."

MODEL_ID = os.getenv("OPENAI_DR_MODEL_NAME")

# ----------------------------
# Deep Research API call
# ----------------------------
response = client.responses.create(
    model=MODEL_ID,
    input=[
        {
            "role": "developer",
            "content": [
                {
                    "type": "input_text",
                    "text": system_message
                }
            ],
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": user_query
                }
            ],
        },
    ],
    reasoning={"summary": "auto"},
    tools=[{"type": "web_search_preview"}],
)

# ----------------------------
# Final report text
# ----------------------------
final_report = response.output[-1].content[0].text
print(final_report)

# ----------------------------
# Access inline citations
# ----------------------------
print("\n--- CITATIONS ---")
annotations = response.output[-1].content[0].annotations

if not annotations:
    print("No annotations found in the report.")
else:
    for i, citation in enumerate(annotations):
        cited_text = final_report[citation.start_index:citation.end_index]
        print(f"Citation {i + 1}:")
        print(f"  Cited Text: {cited_text}")
        print(f"  Title: {citation.title}")
        print(f"  URL: {citation.url}")
        print(f"  Location: chars {citation.start_index}-{citation.end_index}")
        print()

print("\n" + "=" * 50 + "\n")

# ----------------------------
# Inspect intermediate steps
# ----------------------------
print("--- INTERMEDIATE STEPS ---")

# 1. Reasoning steps (summaries only)
try:
    reasoning_step = next(
        item for item in response.output if item.type == "reasoning"
    )
    print("\n[Found a Reasoning Step]")
    for summary_part in reasoning_step.summary:
        print(f"- {summary_part.text}")
except StopIteration:
    print("\nNo reasoning steps found.")

# 2. Web search calls
try:
    search_step = next(
        item for item in response.output if item.type == "web_search_call"
    )
    print("\n[Found a Web Search Call]")
    print(f"  Query Executed: '{search_step.action['query']}'")
    print(f"  Status: {search_step.status}")
except StopIteration:
    print("\nNo web search steps found.")

# 3. Code execution steps (if any)
try:
    code_step = next(
        item for item in response.output if item.type == "code_interpreter_call"
    )
    print("\n[Found a Code Execution Step]")
    print("  Code Input:")
    print(f"```python\n{code_step.input}\n```")
    print("  Code Output:")
    print(code_step.output)
except StopIteration:
    print("\nNo code execution steps found.")

```

## CrewAI Implementation

**planning_crewai.py**

```python
import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

# Load environment variables from .env file for security
load_dotenv()

MODEL_ID = os.getenv("OPENAI_MODEL_NAME")

# 1. Explicitly define the language model for clarity
llm = ChatOpenAI(model=MODEL_ID)

# 2. Define a clear and focused agent
planner_writer_agent = Agent(
    role="Article Planner and Writer",
    goal="Plan and then write a concise, engaging summary on a specified topic.",
    backstory=(
        "You are an expert technical writer and content strategist. "
        "Your strength lies in creating a clear, actionable plan before writing, "
        "ensuring the final summary is both informative and easy to digest."
    ),
    verbose=True,
    allow_delegation=False,
    llm=llm,  # Assign the specific LLM to the agent
)

# 3. Define a task with a more structured and specific expected output
topic = "The importance of Reinforcement Learning in AI"
high_level_task = Task(
    description=(
        f"1. Create a bullet-point plan for a summary on the topic: '{topic}'.\n"
        "2. Write the summary based on your plan, keeping it around 200 words."
    ),
    expected_output=(
        "A final report containing two distinct sections:\n\n"
        "### Plan\n"
        "- A bulleted list outlining the main points of the summary.\n\n"
        "### Summary\n"
        "- A concise and well-structured summary of the topic."
    ),
    agent=planner_writer_agent,
)

# Create the crew with a clear process
crew = Crew(
    agents=[planner_writer_agent],
    tasks=[high_level_task],
    process=Process.sequential,
)

# Execute the task
print("## Running the planning and writing task ##")
result = crew.kickoff()

print("\n\n---\n## Task Result ##\n---")
print(result)

```

