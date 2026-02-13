---
chapter: 05
title: Tool Use
author: Sai Nikhil
date: 2026-02-05
tags: [tool use, tools, function calling]
---

# Tool Use

The Tool Use pattern, often implemented through a mechanism called Function Calling, enables an agent to interact with external APIs, databases, services, or even execute code. It allows the LLM at the core of the agent to decide when and how to use a specific external function based on the user's request or the current state of the task.

## Practical Applications & Use Cases

1. Information Retrieval from External Sources
2. Interacting with Databases and APIs
3. Performing Calculations and Data Analysis
4. Sending Communications
5. Executing Code
6. Controlling Other Systems or Devices

## Summary

**What:** LLMs are powerful text generators, but they are fundamentally disconnected from the outside world. Their knowledge is static, limited to the data they were trained on, and they lack the ability to perform actions or retrieve real-time information. This inherent limitation prevents them from completing tasks that require interaction with external APIs, databases, or services. Without a bridge to these external systems, their utility for solving real-world problems is severely constrained.

**Why:** The Tool Use pattern, often implemented via function calling, provides a standardized solution to this problem. It works by describing available external functions, or "tools," to the LLM in a way it can understand. Based on a user's request, the agentic LLM can then decide if a tool is needed and generate a structured data object (like a JSON) specifying which function to call and with what arguments. An orchestration layer executes this function call, retrieves the result, and feeds it back to the LLM. This allows the LLM to incorporate up-to-date, external information or the result of an action into its final response, effectively giving it the ability to act.

**Rule of thumb:** Use the Tool Use pattern whenever an agent needs to break out of the LLM's internal knowledge and interact with the outside world. This is essential for tasks requiring real-time data (e.g., checking weather, stock prices), accessing private or proprietary information (e.g., querying a company's database), performing precise calculations, executing code, or triggering actions in other systems (e.g., sending an email, controlling smart devices).

## Key Takeaways

- Tool Use (Function Calling) allows agents to interact with external systems and access dynamic information.
- It involves defining tools with clear descriptions and parameters that the LLM can understand.
- The LLM decides when to use a tool and generates structured function calls.
- Agentic frameworks execute the actual tool calls and return the results to the LLM.
- Tool Use is essential for building agents that can perform real-world actions and provide up-to-date information.
- LangChain simplifies tool definition using the @tool decorator and provides create_tool_calling_agent and AgentExecutor for building tool-using agents.
- Google ADK has a number of very useful pre-built tools such as Google Search, Code Execution and Vertex AI Search Tool.



---

# Code Examples

## LangChain Implementation

**tool_use_langchain.py**

```python
import os
import asyncio
import nest_asyncio
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import tool as langchain_tool
from langchain.agents import create_agent

load_dotenv()

MODEL_ID = os.getenv("GOOGLE_MODEL_ID")

llm = ChatGoogleGenerativeAI(model=MODEL_ID, temperature=0)


@langchain_tool
def search_information(query: str) -> str:
    """
    Provides factual information on a given topic (simulated).
    """
    print(f"\n--- 🛠️ Tool Called: search_information with query: '{query}' ---")

    simulated_results = {
        "weather in london": "The weather in London is currently cloudy with a temperature of 15°C.",
        "capital of france": "The capital of France is Paris.",
        "population of earth": "The estimated population of Earth is around 8 billion people.",
        "tallest mountain": "Mount Everest is the tallest mountain above sea level.",
        "default": (
            f"Simulated search result for '{query}': No specific information found, "
            "but the topic seems interesting."
        ),
    }

    result = simulated_results.get(query.lower(), simulated_results["default"])
    print(f"--- TOOL RESULT: {result} ---")
    return result


tools = [search_information]

# New-style agent (LangChain v1)
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant. Use tools when needed.",
)

async def run_agent(query: str):
    print(f"\n--- 🏃 Running Agent with Query: '{query}' ---")

    result = await agent.ainvoke(
        {"messages": [{"role": "user", "content": query}]}
    )

    messages = result.get("messages", [])
    if not messages:
        print("\n🛑 No messages returned.")
        print(result)
        return

    last = messages[-1]
    print("\n--- ✅ Final Agent Response ---")
    if hasattr(last, "content"):
        print(last.content)
    else:
        print(last.get("content", ""))

async def main():
    await asyncio.gather(
        run_agent("What is the capital of France?"),
        run_agent("What's the weather like in London?"),
        run_agent("Tell me something about dogs."),
    )

nest_asyncio.apply()
asyncio.run(main())

```

## CrewAI Implementation

**tool_use_crewai.py**

```python
# pip install crewai langchain-openai

import os
import logging

from crewai import Agent, Task, Crew
from crewai.tools import tool

# ----------------------------
# Best Practice: Configure Logging
# ----------------------------
# A basic logging setup helps in debugging and tracking the crew's execution.
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ----------------------------
# Set up your API Key
# ----------------------------
# For production, it's recommended to use a more secure method for key management
# like environment variables loaded at runtime or a secret manager.
#
# Set the environment variable for your chosen LLM provider (e.g., OPENAI_API_KEY)
# os.environ["OPENAI_API_KEY"] = "YOUR_API_KEY"
# os.environ["OPENAI_MODEL_NAME"] = "gpt-4.1-nano-2025-04-14"

# ----------------------------
# 1. Refactored Tool: Returns Clean Data
# ----------------------------
# The tool now returns raw data (a float) or raises a standard Python error.
# This makes it more reusable and forces the agent to handle outcomes properly.
@tool("Stock Price Lookup Tool")
def get_stock_price(ticker: str) -> float:
    """
    Fetches the latest simulated stock price for a given stock ticker symbol.

    Returns the price as a float. Raises a ValueError if the ticker is not found.
    """
    logging.info(f"Tool Call: get_stock_price for ticker '{ticker}'")

    simulated_prices = {
        "AAPL": 178.15,
        "GOOGL": 1750.30,
        "MSFT": 425.50,
    }

    price = simulated_prices.get(ticker.upper())

    if price is not None:
        return price
    else:
        # Raising a specific error is better than returning a string.
        # The agent is equipped to handle exceptions and can decide on the next action.
        raise ValueError(
            f"Simulated price for ticker '{ticker.upper()}' not found."
        )

# ----------------------------
# 2. Define the Agent
# ----------------------------
# The agent definition remains the same, but it will now leverage the improved tool.
financial_analyst_agent = Agent(
    role="Senior Financial Analyst",
    goal="Analyze stock data using provided tools and report key prices.",
    backstory=(
        "You are an experienced financial analyst adept at using "
        "data sources to find stock information. You provide clear, direct answers."
    ),
    verbose=True,
    tools=[get_stock_price],
    # Allowing delegation can be useful, but is not necessary for this simple task.
    allow_delegation=False,
)

# ----------------------------
# 3. Refined Task: Clearer Instructions and Error Handling
# ----------------------------
# The task description is more specific and guides the agent on how to react
# to both successful data retrieval and potential errors.
analyze_aapl_task = Task(
    description=(
        "What is the current simulated stock price for Apple (ticker: AAPL)? "
        "Use the 'Stock Price Lookup Tool' to find it. "
        "If the ticker is not found, you must report that you were unable "
        "to retrieve the price."
    ),
    expected_output=(
        "A single, clear sentence stating the simulated stock price for AAPL. "
        "For example: 'The simulated stock price for MSFT is $425.50.' "
        "If the price cannot be found, state that clearly."
    ),
    agent=financial_analyst_agent,
)

# ----------------------------
# 4. Formulate the Crew
# ----------------------------
# The crew orchestrates how the agent and task work together.
financial_crew = Crew(
    agents=[financial_analyst_agent],
    tasks=[analyze_aapl_task],
    verbose=True  # Set to False for less detailed logs in production
)

# ----------------------------
# 5. Run the Crew within a Main Execution Block
# ----------------------------
# Using a __name__ == "__main__" block is a standard Python best practice.
def main():
    """Main function to run the crew."""

    # Check for API key before starting to avoid runtime errors.
    if not os.environ.get("OPENAI_API_KEY"):
        print("ERROR: The OPENAI_API_KEY environment variable is not set.")
        print("Please set it before running the script.")
        return

    print("\n## Starting the Financial Crew...")
    print("----------------------------------")

    # The kickoff method starts the execution.
    result = financial_crew.kickoff()

    print("----------------------------------")
    print("## Crew execution finished.")
    print("\nFinal Result:\n", result)


if __name__ == "__main__":
    main()

```

## Google ADK Implementation

**tool_use_adk.py**

```python
from google.adk.agents import Agent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.tools import google_search
from google.genai import types

import nest_asyncio
import asyncio

import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

MODEL_ID = os.getenv("GOOGLE_MODEL_ID")

# -----------------------------------
# Define variables required for Session setup and Agent execution
# -----------------------------------
APP_NAME = "Google_Search_agent"
USER_ID = "user1234"
SESSION_ID = "1234"

# -----------------------------------
# Define Agent with access to Google Search tool
# -----------------------------------
root_agent = Agent(
    name="basic_search_agent",
    model=MODEL_ID,
    description="Agent to answer questions using Google Search.",
    instruction=(
        "I can answer your questions by searching the internet. "
        "Just ask me anything!"
    ),
    tools=[google_search],  # Google Search is a pre-built tool
)

# -----------------------------------
# Agent Interaction
# -----------------------------------
async def call_agent(query: str):
    """
    Helper function to call the agent with a query.
    """

    # Session and Runner
    session_service = InMemorySessionService()
    await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID,
    )

    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service,
    )

    # Create user content
    content = types.Content(
        role="user",
        parts=[types.Part(text=query)],
    )

    # Run agent
    events = runner.run(
        user_id=USER_ID,
        session_id=SESSION_ID,
        new_message=content,
    )

    # Extract final response
    for event in events:
        if event.is_final_response():
            final_response = event.content.parts[0].text
            print("Agent Response:", final_response)


if __name__ == "__main__":
    asyncio.run(call_agent("what's the latest ai news?"))

```

**tool_use_code_executor_adk.py**

```python
import os, getpass
import asyncio
import nest_asyncio
from typing import List
from dotenv import load_dotenv
import logging

from google.adk.agents import Agent as ADKAgent, LlmAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.tools import google_search
from google.adk.code_executors import BuiltInCodeExecutor
from google.genai import types

# Define variables required for Session setup and Agent execution
APP_NAME = "calculator"
USER_ID = "user1234"
SESSION_ID = "session_code_exec_async"

load_dotenv()  # Load environment variables from .env file

MODEL_ID = os.getenv("GOOGLE_MODEL_ID")

# Agent Definition
code_agent = LlmAgent(
    name="calculator_agent",
    model=MODEL_ID,
    code_executor=BuiltInCodeExecutor(),
    instruction="""You are a calculator agent.
When given a mathematical expression, write and execute Python code
to calculate the result.

Return only the final numerical result as plain text, without
markdown or code blocks.
""",
    description="Executes Python code to perform calculations.",
)

# Agent Interaction (Async)
async def call_agent_async(query):

    # Session and Runner
    session_service = InMemorySessionService()

    session = await session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID
    )

    runner = Runner(
        agent=code_agent,
        app_name=APP_NAME,
        session_service=session_service
    )

    content = types.Content(role='user', parts=[types.Part(text=query)])
    print(f"\n--- Running Query: {query} ---")
    final_response_text = "No final text response captured."
    try:
        # Use run_async
        async for event in runner.run_async(
            user_id=USER_ID,
            session_id=SESSION_ID,
            new_message=content
        ):
            print(f"Event ID: {event.id}, Author: {event.author}")

            # --- Check for specific parts FIRST ---
            # has_specific_part = False
            if event.content and event.content.parts and event.is_final_response():
                for part in event.content.parts:  # Iterate through all parts
                    if part.executable_code:
                        # Access the actual code string via .code
                        print(f"  Debug: Agent generated code:\n```python\n{part.executable_code.code}\n```")
                        has_specific_part = True
                    elif part.code_execution_result:
                        # Access outcome and output correctly
                        print(
                            f"  Debug: Code Execution Result: {part.code_execution_result.outcome} - "
                            f"Output:\n{part.code_execution_result.output}"
                        )
                        has_specific_part = True

                    # Also print any text parts found in any event for debugging
                    elif part.text and not part.text.isspace():
                        print(f"  Text: '{part.text.strip()}'")
                        # Do not set has_specific_part=True here, as we want the final response logic below

                # --- Check for final response AFTER specific parts ---
                text_parts = [part.text for part in event.content.parts if part.text]
                final_result = "".join(text_parts)
                print(f"==> Final Agent Response: {final_result}")

    except Exception as e:
        print(f"ERROR during agent run: {e}")

    print("-" * 30)


# Main async function to run the examples
async def main():
    await call_agent_async("Calculate the value of (5 + 7) * 3")
    await call_agent_async("What is 10 factorial?")


# Execute the main async function
try:
    nest_asyncio.apply()
    asyncio.run(main())
except RuntimeError as e:
    # Handle specific error when running asyncio.run in an already running loop (like Jupyter/Colab)
    if "cannot be called from a running event loop" in str(e):
        print("\nRunning in an existing event loop (like Colab/Jupyter).")
        print("Please run `await main()` in a notebook cell instead.")
        # If in an interactive environment like a notebook, you might need to run:
        #
        # await main()
    else:
        raise e  # Re-raise other runtime errors

```

