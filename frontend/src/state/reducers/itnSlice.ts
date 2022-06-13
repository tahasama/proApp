import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const POJECT_URL: any = process.env.REACT_APP_PROJECT_URL;
console.log("fffffffffffffffffffff", POJECT_URL);

export const getAllItns: any = createAsyncThunk("getAllItns", async () => {
  try {
    // console.log("All itn");

    const res = await axios.get(POJECT_URL + "all/");
    // console.log("All itn", res.data);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItnsByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      console.log("All itn by itp..........", POJECT_URL + "all/" + value.itp);

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
  console.log("new itn", value);
  try {
    const res = await axios.post(POJECT_URL + "createItn/", value);
    console.log("res,data...", res.data);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const updateItn = createAsyncThunk("updateItn", async (value: any) => {
  try {
    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',value)
    const res = await axios.put(POJECT_URL + value._id, value);

    return res.data;
  } catch (error) {
    return error;
  }
});

export const deleteItn = createAsyncThunk("deleteItn", async (value: any) => {
  console.log("deleted id", value);

  try {
    const res = await axios.delete(POJECT_URL + value);
    console.log("deleted", res.data);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItn = createAsyncThunk("getItn", async (value: any) => {
  console.log("get itn value", value);
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
    console.log("uploading......", storageRef);

    try {
      await uploadBytesResumable(storageRef, value.pdf);
      try {
        const res = await getDownloadURL(storageRef);
        console.log("broooooooo", res);
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
    console.log("id", value.itnId1, "img2", value.image2);
    const storageRef = ref(
      storage,
      value.image1 ? `${value.itnId1}.jpg` : `${value.itnId2}.jpg`
    );

    // console.log('uploading......',storageRef)

    try {
      await uploadBytesResumable(
        storageRef,
        value.image1 ? value.image1 : value.image2
      );
      try {
        const res = await getDownloadURL(storageRef);
        console.log("broooooooo image1", value.image1);
        console.log("broooooooo image2", value.image2);
        console.log("brooooooo2", res);

        value.image1 !== undefined
          ? await axios.put(POJECT_URL + value.itnId, {
              image1Url: res,
            })
          : await axios.put(POJECT_URL + value.itnId, {
              image2Url: res,
            });
        console.log("brooooooo2", res);
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

  pdf: "",
  itnId: "",
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
    // updateProjectInfos: (state, action) => {
    //   Object.assign(state, action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItns.fulfilled, (state, action) => {
      console.log("getAllItns");
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

export const { updateLoading, UpdateValuesOfSelect } = projectsSlice.actions;

export default projectsSlice.reducer;
