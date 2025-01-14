import React from "react";
import { Card } from "../components/ui/card";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const Home: React.FC = () => {
  return (
    <div className="min-h-screenp-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <section className="text-center py-20 bg-gradient-to-b from-blue-500 to-blue-300 mb-8 shadow-2xl rounded-xl transition-all duration-300 ease-in-out">
        <h1 className="text-5xl font-extrabold text-black tracking-wide mb-6">
          Welcome to NutriCare Hub
        </h1>
        <p className="text-lg text-black mt-4 max-w-6xl mx-auto px-6 sm:px-8 leading-relaxed">
          Hospitals face challenges in managing diverse dietary needs and meal
          preparation. NutriCare Hub solves this by providing a seamless
          solution that enhances communication between food managers, pantry
          staff, and delivery teams, ensuring timely and accurate delivery of
          meals to patients.
        </p>
        <p className="text-lg text-black mt-4 max-w-6xl mx-auto px-6 sm:px-8 leading-relaxed">
          With NutriCare Hub, hospitals can manage patient meal preferences,
          track meal deliveries in real time, and ensure the highest standards
          of nutrition and meal quality. We provide an intuitive interface that
          makes managing hospital meals efficient, transparent, and simple.
        </p>
        <p className="text-lg text-black mt-4 max-w-6xl mx-auto px-6 sm:px-8 leading-relaxed">
          The platform also allows real-time updates, making it easier for
          hospital staff to monitor meal preparation and delivery. This ensures
          the right meals are served at the right time to aid in patient
          recovery.
        </p>

        <div className="mt-6">
          <a href="/signup">
            <Button className="px-6 py-3 bg-blue-50 text-black font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out">
              Sign Up as Manager to Get Started
            </Button>
          </a>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-teal-400 to-green-300 ">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
          Key Features
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto">
          <div className="p-6 bg-white shadow-md hover:bg-blue-50 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Patient Management
            </h3>
            <img
              src="/img3.jpeg"
              alt="Patient Management"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 text-center">
              Easily manage patient details and their food/diet charts to ensure
              proper nutrition.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md hover:bg-blue-50 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Monitor Meal Preparation
            </h3>
            <img
              src="/img2.jpeg"
              alt="Meal Preparation Monitoring"
              className="w-full h-48 object-cover rounded-md my-4"
            />
            <p className="text-gray-600 text-center">
              Assign and track tasks for the hospital's inner pantry staff with
              ease.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md hover:bg-blue-50 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              View and Manage Deliveries
            </h3>
            <img
              src="/img1.jpeg"
              alt="Manage Deliveries"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 text-center">
              View assigned meal boxes with patient and delivery details. Mark
              deliveries as "Done" upon successful delivery to patient rooms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 mt-4 bg-gradient-to-b from-teal-400 to-green-300 mb-8 shadow-2xl rounded-xl transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-8">
          How It Works
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3 max-w-screen-xl mx-auto">
          <Card className="p-6 bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Step 1</h3>
            <p className="text-gray-600 mt-2">
              Managers log in to manage patients, create diet charts, assign
              tasks, and track meal delivery statuses.
            </p>
          </Card>
          <Card className="p-6 bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Step 2</h3>
            <p className="text-gray-600 mt-2">
              Pantry staff log in to manage meal preparation tasks and assign
              delivery personnel.
            </p>
          </Card>
          <Card className="p-6 bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out hover:scale-105 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Step 3</h3>
            <p className="text-gray-600 mt-2">
              Delivery personnel log in to view patient details, access diet
              charts, and mark meals as delivered.
            </p>
          </Card>
        </div>
      </section>
      <section className="py-10 px-6 md:px-20 bg-gradient-to-b from-blue-300 to-blue-500 mt-4">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          FAQ
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-bold text-gray-800">
              What is the Hospital Food Management System?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 mt-2">
              It is a web application designed to efficiently manage patient
              food delivery within a hospital.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-bold text-gray-800">
              How can I manage patient details?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 mt-2">
              You can manage patient details by adding or editing their
              information in the patient management section.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-bold text-gray-800">
              How do I assign tasks to pantry staff?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 mt-2">
              You can assign tasks to pantry staff by navigating to the task
              assignment section and selecting tasks for them.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
};

export default Home;
