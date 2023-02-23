import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "qorncr/";

export const getAllQorNcrs: any = createAsyncThunk(
  "getAllQorNcrs",
  async () => {
    try {
      const res = await axios.get(PROJECT_URL + "all/");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getQorNcr = createAsyncThunk("getQorNcr", async (value: any) => {
  try {
    const res = await axios.get(PROJECT_URL + value);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const createQorNcr = createAsyncThunk(
  "createQorNcr",
  async (value: any) => {
    try {
      const res = await axios.post(PROJECT_URL + "create/", value);

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
      const res = await axios.delete(PROJECT_URL + value);

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
export const uploadImages1 = createAsyncThunk(
  "uploadImage1",
  async (value: any) => {
    const storageRef = ref(storage, `QOR & NCR/${value.qorncrId1}.pdf`);
    try {
      await uploadBytesResumable(storageRef, value.image1);

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);

          value.image1 !== undefined &&
            (await axios.put(PROJECT_URL + value.qorncrId, {
              image1Url: res,
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
    const storageRef = ref(storage, `QOR & NCR/${value.qorncrId2}.pdf`);
    try {
      value.image2 !== undefined &&
        (await uploadBytesResumable(storageRef, value.image2));

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);

          value.image2 !== undefined &&
            (await axios.put(PROJECT_URL + value.qorncrId, {
              image2Url: res,
            }));
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
      state.selectedBox = action.payload;
    },
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

export const { updateWw, UpdateValuesOfSelect, UpdateSelectedBox } =
  projectsSlice.actions;

export default projectsSlice.reducer;
