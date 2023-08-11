import * as types from "../contants";

const DEFAULT_STATE = {
  ListData: [],
  isLoanding: false,
  message: "",
  error: false,
  errorMess: "",
  totalPage: 0,
  totalItem: 0,
  page: 1,
  search: "",
  sortCulumn: "idStatus",
  sortOrder: "asc",
};
export default function statusReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.PAGINATION_SEARCH_SORT_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        page: action.payload.page,
        search: action.payload.search,
        sortOrder: action.payload.sortOrder,
      };
    case types.PAGINATION_SEARCH_SORT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ListData: action.payload.dataTable,
        totalItem: action.payload.totalItem,
      };
    case types.PAGINATION_SEARCH_SORT_STATUS_FAILURE: {
      return {
        ...state,
        error: false,
        errorMess: action.payload.e,
      };
    }

    case types.ADD_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.ADD_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case types.ADD_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    case types.UPDATE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        page: action.payload.page,
      };
    case types.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case types.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    case types.DELETE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        totalPage: action.payload.totalPage,
      };
    case types.DELETE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    case types.GET_STATUS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ListData: action.payload,
      };
    case types.GET_STATUS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
}
