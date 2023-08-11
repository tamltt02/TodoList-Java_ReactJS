import { LIMIT } from "../contants";

async function AddTodoDetaillist(data) {
  try {
    const response = await fetch("http://localhost:8080/job-detail/post", {
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

async function DeleteTodoDetaillist(data) {
  try {
    const response = await fetch(
      "http://localhost:8080/job-detail/delete/" + data,
      {
        method: "DELETE", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function UpdateTodoDetaillist(id, data) {
  // console.log(id, data.c, "da vao day");
  try {
    const response = await fetch("http://localhost:8080/job-detail/put/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.jobDetail),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function PaginationSortSearchTodoDetaillist({
  idJob,
  search,
  page,
  sortOrder,
  sortCulumn,
}) {
  let pages = page - 1;
  const url = `http://localhost:8080/job-detail/pageSearchSortAll/${idJob}?key=${search}&page=${pages}&limit=${LIMIT}&sort=${sortCulumn}&sortOrder=${sortOrder}`;
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
  AddTodoDetaillist,
  DeleteTodoDetaillist,
  UpdateTodoDetaillist,
  PaginationSortSearchTodoDetaillist,
};
