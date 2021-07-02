import React, { Suspense } from "react";
const HelloWorld = React.lazy(() => import("./components/HelloWorld"));
const RenderForm = React.lazy(() => import("./components/RenderForm"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HelloWorld />
        <RenderForm />
      </Suspense>
    </div>
  );
};

export default App;
