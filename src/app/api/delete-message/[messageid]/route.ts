import UserModel from '@/model/User.model';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { Message } from '@/model/User.model';
import { NextRequest } from 'next/server';
import { AuthOptions } from '../../auth/[...nextauth]/options';
import mongoose from 'mongoose';

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const { messageid } = await params;
  const messageObjectId = new mongoose.Types.ObjectId(messageid);

  await dbConnect();
  const session = await getServerSession(AuthOptions);
  const _user: User = session?.user as User;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { email: _user.email },
      { $pull: { messages: { _id: messageObjectId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}