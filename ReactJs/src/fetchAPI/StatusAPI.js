import { LIMIT } from "../contants";

async function GetStatuslist() {
  try {
    const response = await fetch("http://localhost:8080/status/get", {
      method: "GET", // or 'PUT'
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
async function AddStatuslist(data) {
  try {
    const response = await fetch("http://localhost:8080/status/post", {
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

async function DeleteStatuslist(data) {
  try {
    const response = await fetch(
      "http://localhost:8080/status/delete/" + data,
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

async function UpdateStatuslist(id, data) {
  // console.log(id, data.c, "da vao day");
  try {
    const response = await fetch("http://localhost:8080/status/put/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.status),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function PaginationSortSearchStatuslist({
  search,
  page,
  sortOrder,
  sortCulumn,
}) {
  let pages = page - 1;
  const url = `http://localhost:8080/status/pageSearchSortAll?key=${search}&page=${pages}&limit=${LIMIT}&sort=${sortCulumn}&sortOrder=${sortOrder}`;
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
  AddStatuslist,
  GetStatuslist,
  DeleteStatuslist,
  UpdateStatuslist,
  PaginationSortSearchStatuslist,
};
