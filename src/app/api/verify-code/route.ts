import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { username, code } = await request.json()

    const decodedUsername = decodeURIComponent(username) // space into %20 into space
    const user = await UserModel.findOne({ username: decodedUsername })
    if (!user) {
      return Response.json({
        success: false,
        message: "user not found"
      }, { status: 400 })
    }

    const isCodeValid = user.verifyCode === code
    const isCodeNotExpired = new Date(user.verifyCodeExp) > new Date()
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true
      await user.save()
      return Response.json({
        success: true,
        message: "Account verified successfully"
      }, { status: 200 })
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired, please signup again to get a new code"
        }, { status: 400 }
      )
    } else {
      // TODO: We can also check if the user has already a verified account.
      return Response.json({
        success: false,
        message: "Incorrect verification code"
      }, { status: 400 })
    }

  } catch (error) {
    console.error("Error verifying user", error)
    return Response.json({
      success: false,
      message: "Error verifying user"
    }, { status: 500 })
  }

}