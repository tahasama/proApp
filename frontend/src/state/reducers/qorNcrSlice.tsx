import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_PROJECT_URL_NCRQOR;

export const getAllQorNcrs: any = createAsyncThunk(
  "getAllQorNcrs",
  async () => {
    try {
      const res = await axios.get(PROJECT_URL + "all/");
      console.log("waaaaaaaa", res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getQorNcr = createAsyncThunk("getQorNcr", async (value: any) => {
  try {
    console.log("00000d", value);
    const res = await axios.get("http://localhost:5000/api/qorncr/" + value);
    console.log("888888888888", res.data);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const createQorNcr = createAsyncThunk(
  "createQorNcr",
  async (value: any) => {
    console.log("44444444", value);
    try {
      const res = await axios.post(PROJECT_URL + "create/", value);
      console.log("5555555", res.data);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteQorNcr = createAsyncThunk(
  "deleteQorNcr",

  async (value: any) => {
    try {
      console.log("Slice delete44444", value);

      const res = await axios.delete(PROJECT_URL + value);
      console.log("Slice delete", res.data);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const updateQorNcr = createAsyncThunk(
  "updateQorNcr",
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
  "uploadImage",
  async (value: any) => {
    console.log("uploaaaaaaaaaaaaaaaaad", value);
    const storageRef = ref(
      storage,
      value.image1 ? `${value.qorncrId1}.pdf` : `${value.qorncrId2}.pdf`
    );
    try {
      await uploadBytesResumable(
        storageRef,
        value.image1 ? value.image1 : value.image2
      );

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);

          value.image1 !== undefined
            ? await axios.put(PROJECT_URL + value.qorncrId, {
                image1Url: res,
              })
            : await axios.put(PROJECT_URL + value.qorncrId, {
                image2Url: res,
              });
          return res;
        }, 2000);
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);

interface QorNcrsProps {
  qorNcrz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualQorNcr: any;
    ww: any[];
    newStatus: string;
    selectedBox: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualQorNcr: {},
  newStatus: "",
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
      state.newStatus = action.payload.newStatus;
    },
    UpdateSelectedBox: (state, action) => {
      console.log("sliiiiice", action.payload);
      state.selectedBox = action.payload;
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
    builder.addCase(getAllQorNcrs.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });
    builder.addCase(createQorNcr.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(getQorNcr.fulfilled, (state, action) => {
      state.individualQorNcr = action.payload;
    });
    builder.addCase(deleteQorNcr.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(updateQorNcr.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const QorNcrData = (state: QorNcrsProps) => state.qorNcrz;

export const {
  updateWw,
  UpdateValuesOfSelect,
  UpdateSelectedBox,
  //   UpdateValuesOfSelect,
  //   removeItns,
  //   filterByRoutine,
} = projectsSlice.actions;

export default projectsSlice.reducer;
