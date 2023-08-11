import { LIMIT } from "../contants";

async function AddTodolist(data) {
  try {
    const response = await fetch("http://localhost:8080/job/post", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function DeleteTodolist(data) {
  try {
    const response = await fetch("http://localhost:8080/job/delete/" + data, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function UpdateTodolist(id, data) {
  // console.log(id, data.c, "da vao day");
  try {
    const response = await fetch("http://localhost:8080/job/put/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.job),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function PaginationSortSearchTodolist({
  search,
  page,
  sortOrder,
  sortCulumn,
}) {
  let pages = page - 1;
  const url = `http://localhost:8080/job/pageSearchSortAll?key=${search}&page=${pages}&limit=${LIMIT}&sort=${sortCulumn}&sortOrder=${sortOrder}`;
  console.log(url);
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      },
      { mode: "cors" }
    );
    const result = await response.json();
    console.log(response, "result");
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  AddTodolist,
  DeleteTodolist,
  UpdateTodolist,
  PaginationSortSearchTodolist,
};
