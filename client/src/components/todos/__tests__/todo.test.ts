import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TodoView from "@/views/TodoView.vue";
import TodoForm from "@/components/todos/TodoForm.vue";
import TodoList from "@/components/todos/TodoList.vue";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock router-link component
const routerLinkStub = {
  name: 'router-link',
  template: '<a><slot></slot></a>',
  props: ['to']
};

describe("Tasks list", () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockReturnValue(null);
  });

  const mountOptions = {
    global: {
      stubs: {
        'router-link': routerLinkStub
      }
    }
  };

  it("adds a new todo", async () => {
    const wrapper = mount(TodoView, mountOptions);
    const todoForm = wrapper.findComponent(TodoForm);

    await todoForm.vm.$emit("add", {
      title: "New Task",
      priority: "medium",
    });

    const todoList = wrapper.findComponent(TodoList);
    expect(todoList.props("todos")).toHaveLength(1);
    expect(todoList.props("todos")[0]).toMatchObject({
      title: "New Task",
      priority: "medium",
      completed: false,
    });
  });

  it("removes a todo", async () => {
    const wrapper = mount(TodoView, mountOptions);
    const todoForm = wrapper.findComponent(TodoForm);

    // Add a todo first
    await todoForm.vm.$emit("add", {
      title: "Task to remove",
      priority: "low",
    });

    const todoList = wrapper.findComponent(TodoList);
    const todoId = todoList.props("todos")[0].id;

    // Remove the todo
    await todoList.vm.$emit("remove", todoId);

    expect(todoList.props("todos")).toHaveLength(0);
  });

  it("completes a todo", async () => {
    const wrapper = mount(TodoView, mountOptions);
    const todoForm = wrapper.findComponent(TodoForm);

    // Add a todo
    await todoForm.vm.$emit("add", {
      title: "Task to complete",
      priority: "high",
    });

    const todoList = wrapper.findComponent(TodoList);
    const todoId = todoList.props("todos")[0].id;

    // Toggle todo completion
    await todoList.vm.$emit("toggle", todoId);

    expect(todoList.props("todos")[0].completed).toBe(true);
  });

  it("persists todos in localStorage", async () => {
    const wrapper = mount(TodoView, mountOptions);
    const todoForm = wrapper.findComponent(TodoForm);

    await todoForm.vm.$emit("add", {
      title: "Persistent Task",
      priority: "medium",
    });

    // Verify localStorage.setItem was called
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "todos",
      expect.stringContaining("Persistent Task")
    );
  });
});
