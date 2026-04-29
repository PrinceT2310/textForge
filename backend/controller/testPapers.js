import Test from "../model/testSchema.js";
import customResponse from "../utilis/customeResponse.js";

// ✅ Save Test
export async function addTestPaper(req, res){
  try {
    const {
      userId,
      topic,
      questions,
      userAnswers,
      result
    } = req.body;
    // console.log("userAns",userAnswers);
    // console.log("result",result)

    const newTest = await Test.create({
      userId,
      topic,
      questions,
      userAnswers,
      result:JSON.parse(result)
    })

    // const newTest = new Test();
    // await newTest.save();
    return customResponse(
          res,
          201,
          true,
          "Result generated",
          null,
          null
        );

  } catch (error) {
    console.error(error);
    return customResponse(
          res,
          500,
          false,
          "Error saving test",
          error,
          null,
        );
  }
};

export async function getDashboard(req, res) {
  const {id} = req.user

  if(!id){
  return customResponse(
        res,
        400,
        false,
        "Login first",
        null,
        null,
      );
  }
  try {
    const tests = await Test.find({ userId:id })
      .sort({ createdAt: -1 });
    return customResponse(
          res,
          200,
          true,
          "Dashboard",
          null,
          tests
        );

  } catch (error) {
    return customResponse(
          res,
          500,
          false,
          "Error fetching dashboard",
          null,
          null,
        );
  }
}