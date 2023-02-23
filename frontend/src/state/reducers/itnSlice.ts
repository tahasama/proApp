import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const PROJECT_URL: any = process.env.REACT_APP_HEROKU_URL + "itn/";

export const getAllItns: any = createAsyncThunk("getAllItns", async () => {
  try {
    const res = await axios.get(PROJECT_URL + "all/");
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItnsByItp: any = createAsyncThunk(
  "getItnsByItp",
  async (value: any) => {
    try {
      const res = await axios.get(PROJECT_URL + "all/" + value);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const createItn = createAsyncThunk("createItn", async (value: any) => {
  try {
    const res = await axios.post(PROJECT_URL + "create/", value);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const updateItn = createAsyncThunk("updateItn", async (value: any) => {
  try {
    const res = await axios.put(PROJECT_URL + value._id, value);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const deleteItn = createAsyncThunk("deleteItn", async (value: any) => {
  try {
    const res = await axios.delete(PROJECT_URL + value);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getItn = createAsyncThunk("getItn", async (value: any) => {
  try {
    const res = await axios.get(PROJECT_URL + value.itp + "/" + value.itnId);
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
    console.log("before storage");

    const storageRef = ref(
      storage,
      `itn/${value.itnValues.itp}/${
        value.itnValues.routine
      }/QW211101-SNCE-QA-ITN-${handleNumber(value.itnValues.num)}.pdf`
    );
    console.log("after storage");

    try {
      const pp = await uploadBytesResumable(storageRef, value.pdf);
      console.log("pppp", pp);

      try {
        const res = await getDownloadURL(storageRef);
        console.log("res", res);
        console.log("itnId", value);

        const reso = await axios.put(PROJECT_URL + value.itnValues._id, {
          pdfUrl: res,
        });
        console.log("eeeeee", reso);
      } catch (error) {
        return error;
      }
    } catch (error: any) {
      return error;
    }
  }
);

export const uploadImage1 = createAsyncThunk(
  "uploadImage1",
  async (value1: any) => {
    console.log("zzzab", value1);
    const storageRef = ref(storage, `images/${value1.itnId1}.jpg`);
    try {
      await uploadBytesResumable(storageRef, value1.image1);

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);
          console.log("zzzab res", res);

          await axios.put(PROJECT_URL + value1.itnId, {
            image1Url: res,
          });

          return res;
        }, 2000);
      } catch (error) {}
    } catch (error: any) {
      return error;
    }
  }
);

export const uploadImage2 = createAsyncThunk(
  "uploadImage1",
  async (value2: any) => {
    console.log("zzzab2", value2);
    const storageRef = ref(storage, `images/${value2.itnId2}.jpg`);
    try {
      await uploadBytesResumable(storageRef, value2.image2);

      try {
        setTimeout(async () => {
          const res = await getDownloadURL(storageRef);
          console.log("zzzab res2", res);

          await axios.put(PROJECT_URL + value2.itnId, {
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
    itp: string;
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
  itp: "",
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
