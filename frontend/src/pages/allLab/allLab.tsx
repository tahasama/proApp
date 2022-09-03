import { useEffect } from "react";
import "./allLab.css";
import FolderIcon from "@mui/icons-material/Folder";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import NavBar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import JSZip from "jszip";
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
import * as FileSaver from "file-saver";
import { locationsL, workbooks } from "../../constants/constant";

const AllLab = () => {
  const navigate = useNavigate();

  const DownloadFolders = async (): Promise<any> => {
    try {
      const jszip = new JSZip();
      const xxx: any = jszip.folder("All");
      const proms2 = workbooks
        .map(async (wor: any) => {
          const ccc: any = xxx.folder(`${wor}`);
          const proms1 = locationsL
            .map(async (loca: any) => {
              const storage = getStorage();
              const folder = await listAll(
                ref(storage, `/Workbooks/${wor}/${loca}`)
              );
              const promises = folder.items
                .map(async (item) => {
                  const file = await getMetadata(item);
                  const fileRef = ref(storage, item.fullPath);
                  const fileBlob = await getDownloadURL(fileRef).then(
                    async (url) => {
                      const response = await fetch(url);
                      return await response.blob();
                    }
                  );

                  ccc.file(loca + "/" + file.name, fileBlob);
                })
                .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());

              await promises;
            })
            .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
          await proms1;
        })
        .reduce((acc, curr) => acc.then(() => curr), Promise.resolve());
      await proms2;
      const blob = await xxx.generateAsync({
        type: "blob",
      });
      FileSaver.saveAs(blob, `WorkBooks.zip`);
    } catch (err) {
      console.log("here is an error", err);
    }
  };

  return (
    <div className="">
      <div className="navbar">
        <NavBar />
      </div>
      <div style={{ position: "relative", top: 90 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {workbooks.map((w: any, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Button
                style={{
                  color: "Background",
                  backgroundColor: "rgba(9, 15, 47, 0.6)",
                  margin: 25,
                  textAlign: "center",
                }}
                variant="outlined"
                onClick={() => navigate(`/allLab/${w}`)}
              >
                <FolderIcon
                  style={{ color: "rgb(248, 215, 117)", fontSize: 64 }}
                />
                {w}
              </Button>
            </Grid>
          ))}{" "}
          {/* <Button
            disabled
            variant="contained"
            color="success"
            onClick={DownloadFolders}
            startIcon={<DownloadIcon />}
            style={{
              position: "relative",
              fontSize: 16,
              padding: 15,
              left: 581,
              top: 25,
            }}
          >
            Download WorkBooks
          </Button> */}
        </Grid>
      </div>
    </div>
  );
};

export default AllLab;
