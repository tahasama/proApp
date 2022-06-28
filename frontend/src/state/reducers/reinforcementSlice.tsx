import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL_REINFORCEMENT;
console.log("SWFDDD", POJECT_URL);

export const getAllReinforcements: any = createAsyncThunk(
  "getAllReinforcements",
  async () => {
    try {
      const res = await axios.get(POJECT_URL + "all/");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getReinforcementsByItp: any = createAsyncThunk(
  "getReinforcementsByItp",
  async (value: any) => {
    try {
      const res = await axios.get(POJECT_URL + "all/" + value);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getReinforcement = createAsyncThunk(
  "getReinforcement",
  async (value: any) => {
    try {
      const res = await axios.get(
        POJECT_URL + value.itp + "/" + value.reinforcementId
      );

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createReinforcement = createAsyncThunk(
  "createReinforcement",
  async (value: any) => {
    try {
      const res = await axios.post(POJECT_URL + "create/", value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteReinforcement = createAsyncThunk(
  "deleteReinforcement",

  async (value: any) => {
    try {
      const res = await axios.delete(POJECT_URL + value);
      console.log("Slice delete", res.data);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

interface ReinforcementsProps {
  reinforcementz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualReinforcement: any;
    ww: any[];
    X: string;
    newLocation: string;
    newRelated: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualReinforcement: {},
  newLocation: "",
  newRelated: "",
  ww: [],
  X: "hahaha",
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateWw: (state, action) => {
      state.ww = action.payload;
    },
    UpdateValuesOfSelect: (state, action) => {
      state.newLocation = action.payload.newLocation;
      state.newRelated = action.payload.newRelated;
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
    builder.addCase(getAllReinforcements.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getReinforcementsByItp.fulfilled, (state, action) => {
      state.allitp.push(action.payload);
      state.allitp.splice(0, 1);
    });
    builder.addCase(createReinforcement.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getReinforcement.fulfilled, (state, action) => {
      state.individualReinforcement = action.payload;
    });
    builder.addCase(deleteReinforcement.fulfilled, (state, action) => {
      state = action.payload;
      state.X = "Reinforcement has been deleted...";
    });
  },
});

// Action creators are generated for each case reducer function
export const ReinforcementData = (state: ReinforcementsProps) =>
  state.reinforcementz;

export const {
  updateWw,
  UpdateValuesOfSelect,

  //   UpdateValuesOfSelect,
  //   removeItns,
  //   filterByRoutine,
} = projectsSlice.actions;

export default projectsSlice.reducer;
