import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
  QueryConstraint,
  DocumentSnapshot,
  QuerySnapshot,
  DocumentReference
} from 'firebase/firestore';
import { db } from './config';

// Generic function to get a document by ID
export const getDocumentById = async <T>(
  collectionName: string, 
  docId: string
): Promise<T | null> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting document: ${error}`);
    throw error;
  }
};

// Generic function to query documents with pagination
export const queryDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  lastDoc?: DocumentSnapshot<DocumentData>
): Promise<{
  docs: T[];
  lastDoc: DocumentSnapshot<DocumentData> | null;
}> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return { docs: [], lastDoc: null };
    }
    const collectionRef = collection(db, collectionName);
    
    // Build the query with provided constraints
    let q = query(collectionRef, ...constraints);
    
    // Add startAfter for pagination if lastDoc is provided
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const querySnapshot = await getDocs(q);
    const docs: T[] = [];
    let lastVisible: DocumentSnapshot<DocumentData> | null = null;
    
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as T);
      lastVisible = doc;
    });
    
    return {
      docs,
      lastDoc: lastVisible
    };
  } catch (error) {
    console.error(`Error querying documents: ${error}`);
    throw error;
  }
};

// Add a new document to a collection
export const addDocument = async <T>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<string> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      throw new Error('Firestore is not initialized');
    }
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document: ${error}`);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async <T>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      throw new Error('Firestore is not initialized');
    }
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating document: ${error}`);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      throw new Error('Firestore is not initialized');
    }
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document: ${error}`);
    throw error;
  }
};

// Get documents with specific field value
export const getDocumentsByField = async <T>(
  collectionName: string,
  fieldName: string,
  fieldValue: any,
  orderByField: string = 'createdAt',
  descending: boolean = true,
  limitCount: number = 10
): Promise<T[]> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return [];
    }
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      where(fieldName, '==', fieldValue),
      orderBy(orderByField, descending ? 'desc' : 'asc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const docs: T[] = [];
    
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as T);
    });
    
    return docs;
  } catch (error) {
    console.error(`Error getting documents by field: ${error}`);
    throw error;
  }
}; 