import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL;

export const getAllItns: any = createAsyncThunk("getAllItns", async () => {
  try {
    const res = await axios.get(POJECT_URL + "all/");
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItnsByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      const res = await axios.get(POJECT_URL + "all/" + value.itp);
      console.log("hello", res.data);

      console.log("All itn by itp", res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createItn = createAsyncThunk("createItn", async (value: any) => {
  try {
    const res = await axios.post(POJECT_URL + "createItn/", value);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const updateItn = createAsyncThunk("updateItn", async (value: any) => {
  try {
    const res = await axios.put(POJECT_URL + value._id, value);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const deleteItn = createAsyncThunk("deleteItn", async (value: any) => {
  try {
    const res = await axios.delete(POJECT_URL + value);
    console.log("deleted", res.data);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItn = createAsyncThunk("getItn", async (value: any) => {
  try {
    const res = await axios.get(POJECT_URL + value.itp + "/" + value.itnId);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const uploadPdfFile = createAsyncThunk(
  "uploadPdfFile",
  async (value: any) => {
    const storageRef = ref(storage, `${value.itnId}.pdf`);
    try {
      await uploadBytesResumable(storageRef, value.pdf);
      try {
        const res = await getDownloadURL(storageRef);
        await axios.put(POJECT_URL + value.itnId, {
          pdfUrl: res,
        });
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);

export const uploadImages = createAsyncThunk(
  "uploadImage",
  async (value: any) => {
    const storageRef = ref(
      storage,
      value.image1 ? `${value.itnId1}.jpg` : `${value.itnId2}.jpg`
    );
    try {
      await uploadBytesResumable(
        storageRef,
        value.image1 ? value.image1 : value.image2
      );
      try {
        const res = await getDownloadURL(storageRef);
        value.image1 !== undefined
          ? await axios.put(POJECT_URL + value.itnId, {
              image1Url: res,
            })
          : await axios.put(POJECT_URL + value.itnId, {
              image2Url: res,
            });
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);
interface itnsProps {
  itnz: {
    all: {}[];
    newAll: {}[];
    allitp: {}[];
    loading: boolean;
    individualItn: any;
    newLocation: string;
    newRoutine: string;
    newReview: string;
    pdf: string;
    itnId: string;
    _id: string;
  };
}

const initialState = {
  all: [{}],
  allitp: [{}],
  loading: true,
  individualItn: {},
  newLocation: "",
  newRoutine: "",
  newReview: "",
  _id: "",
  pdf: "",
  itnId: "",
  newAll: [{}],
};

export const projectsSlice = createSlice({
  name: "projects-redux",
  initialState: initialState,
  reducers: {
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    UpdateValuesOfSelect: (state, action) => {
      state.newLocation = action.payload.newLocation;
      state.newRoutine = action.payload.newRoutine;
      state.newReview = action.payload.newReview;
    },
    removeItns: (state, action) => {
      state.all = state.all
        .flat()
        .filter((itn: any) => itn._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItns.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getItnsByItp.fulfilled, (state, action) => {
      console.log("getItnsByItp");
      state.allitp.push(action.payload);
      state.allitp.splice(0, 1);
    });

    builder.addCase(getItn.fulfilled, (state, action) => {
      state.individualItn = action.payload;
    });
    builder.addCase(createItn.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(updateItn.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(deleteItn.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const itnData = (state: itnsProps) => state.itnz;

export const { updateLoading, UpdateValuesOfSelect, removeItns } =
  projectsSlice.actions;

export default projectsSlice.reducer;
