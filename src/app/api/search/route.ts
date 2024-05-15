import { NextResponse, NextRequest } from "next/server";
import { Op } from "sequelize";
import models from "@/app/utils/models";

export async function POST(request: NextRequest) {
  try {
    if (request.method === "POST") {
      const body = await request.json();
      const { search } = body;
      const data = await models.info_image.findAll({attributes:["path_Img","img_ID"], where: {imgName: { [Op.like]: `%${search}%` },}, raw: true});
      const datas = data.map((item: any) => item.path_Img+"?id="+item.img_ID);
      return NextResponse.json({
        istrue: true,
        message: "Success",
        status: 200,
        img_url: datas,
      });
    }
  } catch (error) {
    console.log("Error During login : ", error);
    return NextResponse.json({ istrue: false, message: "Error", status: 500 });
  }
}
