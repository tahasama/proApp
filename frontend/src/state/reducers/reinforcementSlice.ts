import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "reinforcement/";
console.log("rrrrrrrrrrrrrrrrrr", PROJECT_URL);
export const getAllReinforcements: any = createAsyncThunk(
  "getAllReinforcements",
  async () => {
    try {
      const res = await axios.get(PROJECT_URL + "all/");
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
      const res = await axios.get(PROJECT_URL + "all/" + value);

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
      const res = await axios.get(PROJECT_URL + "/" + value);

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
      const res = await axios.post(PROJECT_URL + "create/", value);
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
      const res = await axios.delete(PROJECT_URL + value);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateReinforcement = createAsyncThunk(
  "updateReinforcement",
  async (value: any) => {
    try {
      const res = await axios.put(PROJECT_URL + value._id, value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const uploadImages = createAsyncThunk(
  "uploadImages",
  async (value: any) => {
    const storageRef = ref(storage, `RIR/${value.reinforcementId}.pdf`);
    try {
      await uploadBytesResumable(storageRef, value.image);

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);

          value.image !== undefined &&
            (await axios.put(PROJECT_URL + value.reinforcementId, {
              relatedDocs: res,
            }));

          return res;
        }, 2000);
      } catch (error) {}
    } catch (error: any) {
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
    newLocation: string;
    newType: string;
    selectedBox: string;
    newReview: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualReinforcement: {},
  newLocation: "",
  newType: "",
  newReview: "",
  ww: [],
  selectedBox: "",
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
      state.newType = action.payload.newType;
      state.newReview = action.payload.newReview;
    },
    UpdateSelectedBox: (state, action) => {
      state.selectedBox = action.payload;
    },
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
    });
    builder.addCase(updateReinforcement.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const ReinforcementData = (state: ReinforcementsProps) =>
  state.reinforcementz;

export const { updateWw, UpdateValuesOfSelect, UpdateSelectedBox } =
  projectsSlice.actions;

export default projectsSlice.reducer;
