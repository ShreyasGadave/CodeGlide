import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Features/Auth/AuthSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Label } from "../Components/ui/label";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";

const sections = ["personal", "education", "skills", "career"];

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const [activeSection, setActiveSection] = useState("personal");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/profile/edit");
    }
  }, [user, navigate]);

  const nextSection = () => {
    const index = sections.indexOf(activeSection);
    if (index < sections.length - 1) {
      setActiveSection(sections[index + 1]);
    }
  };

  const prevSection = () => {
    const index = sections.indexOf(activeSection);
    if (index > 0) {
      setActiveSection(sections[index - 1]);
    }
  };

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome 👋
          </CardTitle>
          <p className="text-center text-gray-600">Create your account</p>
        </CardHeader>

        <CardContent>
          {/* SECTION NAVBAR */}
          <div className="flex justify-between border-b mb-4">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => setActiveSection(section)}
                className={`pb-2 capitalize text-sm ${
                  activeSection === section
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* ================= PERSONAL ================= */}
            {activeSection === "personal" && (
              <>
                <div>
                  <Label>Name</Label>
                  <Input
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Username</Label>
                  <Input
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "Min 3 characters" },
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of birth required",
                    })}
                  />
                </div>

                <div>
                  <Label>Mobile</Label>
                  <Input
                    {...register("mobile", {
                      required: "Mobile required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email required",
                    })}
                  />
                </div>
              </>
            )}

            {/* ================= EDUCATION ================= */}
            {activeSection === "education" && (
              <>
                <div>
                  <Label>College</Label>
                  <Input {...register("college")} />
                </div>

                <div>
                  <Label>Course</Label>
                  <Input {...register("course")} />
                </div>

                <div>
                  <Label>Branch</Label>
                  <Input {...register("branch")} />
                </div>

                <div>
                  <Label>Year</Label>
                  <Input type="number" {...register("year")} />
                </div>
              </>
            )}

            {/* ================= SKILLS ================= */}
            {activeSection === "skills" && (
              <>
                <div>
                  <Label>Skills (comma separated)</Label>
                  <Input
                    {...register("skills")}
                    placeholder="React, Node, MongoDB"
                  />
                </div>

                <div>
                  <Label>Interests</Label>
                  <Input {...register("interests")} />
                </div>

                <div>
                  <Label>GitHub</Label>
                  <Input {...register("github")} />
                </div>
              </>
            )}

            {/* ================= CAREER ================= */}
            {activeSection === "career" && (
              <>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                  />
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    {...register("confirmPassword", {
                      validate: (v) =>
                        v === watch("password") || "Passwords do not match",
                    })}
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    {...register("terms", {
                      required: "Accept terms",
                    })}
                  />
                  <Label className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600">
                      Terms
                    </Link>
                  </Label>
                </div>
              </>
            )}

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded">
                {error}
              </div>
            )}

            {/* NAV BUTTONS */}
            <div className="flex justify-between pt-4">
              {activeSection !== "personal" && (
                <Button type="button" variant="outline" onClick={prevSection}>
                  Back
                </Button>
              )}

              {activeSection !== "career" ? (
                <Button type="button" onClick={nextSection}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              )}
            </div>

            <p className="text-center text-sm pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
