export const locations = [
  "aerationTank",
  "PrimaryClarifierP7",
  "PrimaryClarifierP8",
  "PrimaryClarifierP9",
  "secondaryClarifierP24",
  "secondaryClarifierP25",
  "secondaryClarifierP32",
  "mainBuilding",
  "workShop",
  "chlorinationTank",
  "pumpingStation2",
  "pumpingStation1",
  "sandFilter",
  "preliminaryTreatment",
  "closingWall",
  "other",
];

export const locationsR = [
  "aerationTank",
  "PrimaryClarifier",
  "secondaryClarifier",
  "mainBuilding",
  "workShop",
  "chlorinationTank",
  "pumpingStation2",
  "pumpingStation1",
  "sandFilter",
  "preliminaryTreatment",
  "closingWall",
];

export const labelsName: any = [
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];

export const routines = [
  "Setting Out",
  "Excavation until foundation Bottom",
  "Conduites Installation ",
  "Lean Concrete",
  "Mass Concrete",
  "Reinforcement & Formwork",
  "Concrete placing and finishing",
  "Curing",
  "Waterproofing coat",
  "Backfilling",
  "Treatement protection layer",
  "Concrete Tests",
];

export const workbooks = [
  "Compaction Tests",
  "Compression Strength 7 days",
  "Compression Strength 28 days",
  "Concrete Formulation Report",
  "Convenience Report",
  "Geotechnical Study ",
  "Excavation Bottom Foundation Check",
  "Preliminairy Report",
  "Material Identification",
];

export const handleNumber = (num: any) => {
  return num < 10 ? "000" + num : num < 100 ? "00" + num : "0" + num;
};

export const locationsL = [
  "secondaryClarifier",
  "PrimaryClarifier",
  "aerationTank",
  "mainBuilding",
  "workShop",
  "chlorinationTank",
  "pumpingStation2",
  "pumpingStation1",
  "sandFilter",
  "closingWall",
  "GAT01",
  "GAT02",
  "GAT03",
  "GAT04",
  "Stock",
];
