import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebase, { storage } from "../../firebase";
import JSZip from "jszip";
import * as FileSaver from "file-saver";
import { useState } from "react";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL_ITN;

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
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createItn = createAsyncThunk("createItn", async (value: any) => {
  try {
    const res = await axios.post(POJECT_URL + "create/", value);
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
const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};
export const uploadPdfFile = createAsyncThunk(
  "uploadPdfFile",
  async (value: any) => {
    const storageRef = ref(
      storage,
      `itn/${value.itnValues.itp}/${
        value.itnValues.routine
      }/QW211101-SNCE-QA-ITN-${handleNumber(value.itnValues.num)}.pdf`
    );
    try {
      await uploadBytesResumable(storageRef, value.pdf);
      try {
        const res = await getDownloadURL(storageRef);
        await axios.put(POJECT_URL + value.itnId, {
          pdfUrl: res,
        });
      } catch (error) {
        return error;
      }
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
      value.image1
        ? `itn/aizenFolder/${value.itnId1}.jpg`
        : `${value.itnId2}.jpg`
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
            ? await axios.put(POJECT_URL + value.itnId, {
                image1Url: res,
              })
            : await axios.put(POJECT_URL + value.itnId, {
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
interface itnsProps {
  itnz: {
    all: {}[];
    allitp: {}[];
    loading: boolean;
    individualItn: any;
    newLocation: string;
    newRoutine: string;
    newReview: string;
    pdf: string;
    itnId: string;
    _id: string;
    filter: any;
    ww: any[];
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
  filter: "",
  ww: [],
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

    filterByRoutine: (state, action) => {
      state.filter = action.payload;
    },
    updateWw: (state, action) => {
      state.ww = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItns.fulfilled, (state, action) => {
      state.all.push(action.payload);
      state.all.splice(0, 1);
    });

    builder.addCase(getItnsByItp.fulfilled, (state, action) => {
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

export const {
  updateWw,
  updateLoading,
  UpdateValuesOfSelect,
  // removeItns,
  filterByRoutine,
} = projectsSlice.actions;

export default projectsSlice.reducer;
