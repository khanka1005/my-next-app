import React from 'react';
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css';
import Image from 'next/image';
import { fetchUser } from '@/app/lib/data';
import { uptadeUser } from '@/app/lib/action';

const SingleUserPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/avatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={uptadeUser} className={styles.form}>
          <input type="hidden" name="id" value={user.id} />
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="Email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="Password" />
          <label>Phone</label>
          <input type="text" name="Phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea name="Address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value="true" selected={user.isAdmin}>Yes</option>
            <option value="false" selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value="true" selected={user.isActive}>Yes</option>
            <option value="false" selected={!user.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
