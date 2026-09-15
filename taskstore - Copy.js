class TaskStore {
  constructor() {
    this.tasks = [];
    this.idCounter = 1;
  }

  add(title, priority, ownerId) {
    if (!title || title.trim() == "") {
      throw new Error("Title cannot be empty");
    }
    if (priority < 1 || priority > 3) {
      throw new Error("Priority must be between 1 and 3");
    }

    let newTask = {
      id: this.idCounter,
      title: title,
      status: "todo",
      priority: priority,
      ownerId: ownerId
    };

    this.tasks.push(newTask);
    this.idCounter++;
    return newTask;
  }

  findById(id) {
    let target = null;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        target = this.tasks[i];
        break;
      }
    }
    return target;
  }

  update(id, changes) {
    let task = this.findById(id);
    if (!task) {
      return null;
    }

    if (changes.title !== undefined) {
      if (changes.title.trim() == "") {
        throw new Error("Title cannot be empty");
      }
      task.title = changes.title;
    }

    if (changes.status !== undefined) {
      if (changes.status != "todo" && changes.status != "doing" && changes.status != "done") {
        throw new Error("Invalid status");
      }
      task.status = changes.status;
    }

    if (changes.priority !== undefined) {
      if (changes.priority < 1 || changes.priority > 3) {
        throw new Error("Priority must be between 1 and 3");
      }
      task.priority = changes.priority;
    }

    if (changes.ownerId !== undefined) {
      task.ownerId = changes.ownerId;
    }

    return task;
  }

  remove(id) {
    let indexToRemove = -1;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        indexToRemove = i;
        break;
      }
    }

    if (indexToRemove === -1) {
      return false;
    }

    this.tasks.splice(indexToRemove, 1);
    return true;
  }

  list(filter) {
    let copyList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      copyList.push({
        id: this.tasks[i].id,
        title: this.tasks[i].title,
        status: this.tasks[i].status,
        priority: this.tasks[i].priority,
        ownerId: this.tasks[i].ownerId
      });
    }

    if (filter) {
      let temp = [];
      for (let i = 0; i < copyList.length; i++) {
        let match = true;
        if (filter.status !== undefined && copyList[i].status !== filter.status) {
          match = false;
        }
        if (filter.ownerId !== undefined && copyList[i].ownerId !== filter.ownerId) {
          match = false;
        }
        if (match) {
          temp.push(copyList[i]);
        }
      }
      copyList = temp;
    }

    copyList.sort(function(a, b) {
      return b.priority - a.priority;
    });

    return copyList;
  }

  countByStatus() {
    let counts = {
      todo: 0,
      doing: 0,
      done: 0
    };

    for (let i = 0; i < this.tasks.length; i++) {
      let currentStatus = this.tasks[i].status;
      if (counts[currentStatus] !== undefined) {
        counts[currentStatus]++;
      }
    }

    return counts;
  }

  async importFromApi(userId) {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=" + userId);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      let items = await res.json();

      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let st = "todo";
        if (item.completed === true) {
          st = "done";
        }
        this.add(item.title, 1, item.userId);
      }
    } catch (err) {
      console.log("Error happened: " + err.message);
    }
  }
}

async function testMyCode() {
  let myStore = new TaskStore();
  
  myStore.add("Study JavaScript", 3, 1);
  myStore.add("Do laundry", 1, 1);
  myStore.add("Go to university", 2, 2);
  myStore.add("Buy coffee", 2, 1);

  console.log("Counts:", myStore.countByStatus());

  myStore.update(1, { status: "doing" });
  myStore.remove(2);

  await myStore.importFromApi(1);

  console.log("Final Todo List:", myStore.list({ status: "todo" }));
}

testMyCode();