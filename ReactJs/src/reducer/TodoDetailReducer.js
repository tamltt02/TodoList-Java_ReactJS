import * as types from "../contants";

const DEFAULT_STATE = {
  ListData: [],
  isLoanding: false,
  message: "",
  error: false,
  errorMess: "",
  totalPage: 0,
  page: 1,
  idJob: "",
  search: "",
  sortCulumn: "idJobDetail",
  sortOrder: "asc",
};
export default function TodoDetailReducer(state = DEFAULT_STATE, action) {
  console.log(action, "action");
  switch (action.type) {
    //   };
    case types.PAGINATION_SEARCH_SORT_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        idJob: action.payload.idJob,
        page: action.payload.page,
        search: action.payload.search,
        sortOrder: action.payload.sortOrder,
      };
    case types.PAGINATION_SEARCH_SORT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ListData: action.payload.dataTable,
        totalItem: action.payload.totalItem,
      };
    case types.PAGINATION_SEARCH_SORT_DETAIL_FAILURE: {
      return {
        ...state,
        error: false,
        errorMess: action.payload.e,
      };
    }

    case types.ADD_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        idJob: action.payload.idJob,
      };
    case types.ADD_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case types.ADD_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    case types.UPDATE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        page: action.payload.page,
      };
    case types.UPDATE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case types.UPDATE_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    case types.DELETE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        totalPage: action.payload.totalPage,
      };
    case types.DELETE_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
