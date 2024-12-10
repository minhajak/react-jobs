import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import React from 'react'
import HomePages from './Pages/HomPage'
import MainLayout from './Layouts/MainLayout'
import JobsPages from './Pages/JobsPages'
import { NotFoundPage } from './Pages/NotFoundPage'
import JobPage, { jobLoader } from './Pages/JobPage'; 
import AddJobPage from './Pages/AddJobPage'
import EditJobPage from './Pages/EditJobPage'

const App = () => {
  const addJob = async (newJob) => {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  }

  const deleteJob = async (id) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',

    });
    return;

  }


  const updatedJob = async (job) => {
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    });
    return;

  }

  const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePages />} />
        <Route path='/jobs' element={<JobsPages />} />
        <Route path='/add-jobs' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='job/edit/:id' element={<EditJobPage updateJobSubmit={updatedJob} />} loader={jobLoader} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true, 
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }

  )

  return <RouterProvider router={router} />
}

export default App