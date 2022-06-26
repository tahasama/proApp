import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL_CONCRETE;

export const getAllConcretes: any = createAsyncThunk(
  "getAllConcretes",
  async () => {
    try {
      const res = await axios.get(POJECT_URL + "all/");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getConcretesByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      const res = await axios.get(POJECT_URL + "all/" + value.itp);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getConcrete = createAsyncThunk(
  "getConcrete",
  async (value: any) => {
    try {
      const res = await axios.get(
        POJECT_URL + value.itp + "/" + value.concreteId
      );

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createConcrete = createAsyncThunk(
  "createConcrete",
  async (value: any) => {
    try {
      const res = await axios.post(POJECT_URL + "create/", value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

// export const updateItn = createAsyncThunk("updateItn", async (value: any) => {
//   try {
//     const res = await axios.put(POJECT_URL + value._id, value);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// });

// export const deleteItn = createAsyncThunk("deleteItn", async (value: any) => {
//   try {
//     const res = await axios.delete(POJECT_URL + value);
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// });

interface concretesProps {
  concretez: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualConcrete: any;
    ww: any[];
    X: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualConcrete: {},
  ww: [],
  X: "hey",
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateWw: (state, action) => {
      console.log("SLIIICCE....", action.payload);
      state.ww = action.payload;
    },
    updateX: (state, action) => {
      console.log("SLIIICCE....XXX", action);
      state.X = action.payload;
    },
    // },
    // UpdateValuesOfSelect: (state, action) => {
    //   state.newLocation = action.payload.newLocation;
    //   state.newRoutine = action.payload.newRoutine;
    //   state.newReview = action.payload.newReview;
    // },
    // removeItns: (state, action) => {
    //   state.all = state.all
    //     .flat()
    //     .filter((itn: any) => itn._id !== action.payload);
    // },
    // filterByRoutine: (state, action) => {
    //   state.filter = action.payload;
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConcretes.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getConcretesByItp.fulfilled, (state, action) => {
      state.allitp.push(action.payload);
      state.allitp.splice(0, 1);
    });
    builder.addCase(createConcrete.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getConcrete.fulfilled, (state, action) => {
      state.individualConcrete = action.payload;
    });
    // builder.addCase(updateItn.fulfilled, (state, action) => {
    //   state = action.payload;
    // });
    // builder.addCase(deleteItn.fulfilled, (state, action) => {
    //   state = action.payload;
    // });
  },
});

// Action creators are generated for each case reducer function
export const concreteData = (state: concretesProps) => state.concretez;

export const {
  updateWw,
  updateX,
  //   UpdateValuesOfSelect,
  //   removeItns,
  //   filterByRoutine,
} = projectsSlice.actions;

export default projectsSlice.reducer;
