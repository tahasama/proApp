import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "lab/";

// const PROJECT_URL: any = "http://localhost:5000/api/lab/";

export const getAllLab: any = createAsyncThunk("getAllLab", async () => {
  try {
    const res = await axios.get(PROJECT_URL + "all/");
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getLab = createAsyncThunk("getLab", async (value: any) => {
  try {
    const res = await axios.get(PROJECT_URL + value);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const createLab = createAsyncThunk("createLab", async (value: any) => {
  try {
    console.log("dddddd", value);
    const res = await axios.post(PROJECT_URL + "create/", value);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const deleteLab = createAsyncThunk(
  "deleteLab",

  async (value: any) => {
    try {
      const res = await axios.delete(PROJECT_URL + value);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateLab = createAsyncThunk("updateLab", async (value: any) => {
  try {
    const res = await axios.put(PROJECT_URL + value._id, value);
    return res.data;
  } catch (error) {
    return error;
  }
});
export const uploadImages1 = createAsyncThunk(
  "uploadImage1",
  async (value: any) => {
    const storageRef = ref(
      storage,
      `Workbooks/${value.typeL}/${value.location}/${value.LabId1}.pdf`
    );
    try {
      await uploadBytesResumable(storageRef, value.image1);

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);
          value.image1 !== undefined &&
            (await axios.put(PROJECT_URL + value.LabId, {
              manifoldUrl: res,
            }));

          return res;
        }, 2000);
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);
export const uploadImages2 = createAsyncThunk(
  "uploadImage",
  async (value: any) => {
    const storageRef = ref(
      storage,
      `Workbooks/${value.typeL}/${value.location}/${value.LabId2}.pdf`
    );
    try {
      value.image2 !== undefined &&
        (await uploadBytesResumable(storageRef, value.image2));

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);

          value.image2 !== undefined &&
            (await axios.put(PROJECT_URL + value.LabId, {
              reportUrl: res,
            }));
          return res;
        }, 2000);
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);

interface LabsProps {
  labz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualLab: any;
    ww: any[];
    // newType: string;
    selectedBox: string;
    newLocation: string;
    newConcreteType: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualLab: {},
  // newType: "",
  ww: [],
  selectedBox: "",
  newLocation: "",
  newConcreteType: "",
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
      console.log("in slice", action.payload);
      // state.newType = action.payload.newType;
      state.newLocation = action.payload.newLocation;
      state.newConcreteType = action.payload.newConcreteType;
    },
    UpdateSelectedBox: (state, action) => {
      state.selectedBox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLab.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });
    builder.addCase(createLab.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getLab.fulfilled, (state, action) => {
      state.individualLab = action.payload;
    });
    builder.addCase(deleteLab.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(updateLab.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const LabData = (state: LabsProps) => state.labz;

export const { updateWw, UpdateValuesOfSelect, UpdateSelectedBox } =
  projectsSlice.actions;

export default projectsSlice.reducer;
