import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: user?.profile?.resume || '',
    profilePhotoFile: null
  });

  const dispatch = useDispatch();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = e => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const profilePhotoChangeHandler = e => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhotoFile: file });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }
    if (input.profilePhotoFile) {
      formData.append('profilePhoto', input.profilePhotoFile);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px] bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="space-y-4 py-2">
            {/* Reusable Input Group */}
            {[
              { id: 'name', label: 'Name', value: input.fullname, name: 'fullname', type: 'text' },
              { id: 'email', label: 'Email', value: input.email, name: 'email', type: 'email' },
              { id: 'number', label: 'Phone Number', value: input.phoneNumber, name: 'phoneNumber', type: 'text' },
              { id: 'bio', label: 'Bio', value: input.bio, name: 'bio', type: 'text' },
              { id: 'skills', label: 'Skills', value: input.skills, name: 'skills', type: 'text' }
            ].map((field) => (
              <div key={field.id} className="flex flex-col space-y-1">
                <Label htmlFor={field.id} className="text-zinc-700 dark:text-zinc-300">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  value={field.value}
                  onChange={changeEventHandler}
                  className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
                />
              </div>
            ))}

            {/* Resume Upload */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="file" className="text-zinc-700 dark:text-zinc-300">
                Resume (PDF)
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white file:text-blue-600"
              />
            </div>

            {/* Profile Photo Upload */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="profilePhoto" className="text-zinc-700 dark:text-zinc-300">
                Profile Photo (Image)
              </Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={profilePhotoChangeHandler}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white file:text-blue-600"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
