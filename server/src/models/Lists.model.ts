import mongoose from 'mongoose';

export interface ILists extends Document {
  arch_area: number;
  sno: string;
  rcpt_yr: string;
  opbiz_restagnt_sgg_nm: string;
  stdg_nm: string;
  land_area: number;
  lotno_se: string;
  thing_amt: string;
  rght_se: string | null;
  rtrcn_day: string | null;
  flr: number;
  cgg_cd: string;
  ctrt_day: string;
  bldg_usg: string;
  stdg_cd: string;
  bldg_nm: string;
  dclr_se: string;
  mno: string;
  cgg_nm: string;
  lotno_se_nm: string;
  arch_yr: string;
}

const listSchema = new mongoose.Schema<ILists>({
  arch_area: {
    type: Number,
  },
  sno: {
    type: String,
  },
  rcpt_yr: {
    type: String,
  },
  opbiz_restagnt_sgg_nm: {
    type: String,
  },
  stdg_nm: {
    type: String,
  },
  land_area: {
    type: Number,
  },
  lotno_se: {
    type: String,
  },
  thing_amt: {
    type: String,
  },
  rght_se: {
    type: String,
    default: null,
  },
  rtrcn_day: {
    type: String,
    default: null,
  },
  flr: {
    type: Number,
  },
  cgg_cd: {
    type: String,
  },
  ctrt_day: {
    type: String,
  },
  bldg_usg: {
    type: String,
  },
  stdg_cd: {
    type: String,
  },
  bldg_nm: {
    type: String,
  },
  dclr_se: {
    type: String,
  },
  mno: {
    type: String,
  },
  cgg_nm: {
    type: String,
  },
  lotno_se_nm: {
    type: String,
  },
  arch_yr: {
    type: String,
  },
});

const Lists = mongoose.model<ILists>('Lists', listSchema);

export default Lists;
