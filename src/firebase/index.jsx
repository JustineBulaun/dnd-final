import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";

// Eto sir yung mga functions para mag communicate or mag CRUD operations sa firebase

const firebaseConfig = {
  apiKey: "AIzaSyBsVBBztEpwclxK6UK_YWrVYNxitSr_XOM",
  authDomain: "dnd-pf.firebaseapp.com",
  projectId: "dnd-pf",
  storageBucket: "dnd-pf.appspot.com",
  messagingSenderId: "948453790097",
  appId: "1:948453790097:web:a011581d50ffb6e3bd8a30",
};

//Firebase App Initialize
export const appFB = initializeApp(firebaseConfig);

//Services
export const firestoreDB = getFirestore();
export const authFB = getAuth();

//References
export const taskSectionRef = collection(firestoreDB, "TaskSections");
export const notesRef = collection(firestoreDB, "Notes");
export const productsRef = collection(firestoreDB, "products");
export const ordersRef = collection(firestoreDB, "orders");

export const addOrder = async (orderData) => {
  console.log(authFB);
  const userId = authFB.currentUser?.uid;
  if (!userId) return;
  await addDoc(collection(firestoreDB, "orders"), {
    ...orderData,
    userId,
    status: "pending",
    email: authFB.currentUser.email,
    createdAt: serverTimestamp(),
  });
};

export const changeOrderStatus = async (orderId, status) => {
  const userId = authFB.currentUser?.uid;
  if (!userId) return;
  return await updateDoc(doc(firestoreDB, "orders", orderId), { status });
};

export const getAllOrders = async () => {
  const q = query(ordersRef);
  const querySnapshot = await getDocs(q);
  const orders = [];
  querySnapshot.forEach((doc) => {
    orders.push({ ...doc.data(), id: doc.id });
  });
  return orders;
};

export const deletOrder = async (orderId) => {
  const userId = authFB.currentUser?.uid;
  if (!userId) return;
  return await deleteDoc(doc(firestoreDB, "orders", orderId));
};

export const fetchAllProducts = async () => {
  const q = query(productsRef);
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });
  console.log(products);
  return products;
};
