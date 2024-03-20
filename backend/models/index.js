
const Sequelize = require("sequelize");
const connection = require('../api/connection');
const getCategoryModel = require("./category.model")
const getProductModel = require("./products.model")
const getStoreModel = require("./store.model");
const getUserModel = require("./user.model");
const getDoctorModel = require("./doctor.model");
const getPaymentModel = require("./payment.model");
const getWithdrawalModel = require("./withdrawal.model");
const getOrdersModel = require("./orders.model");
const getOrderItemsModel = require("./order_items.model");
const getRiderModel = require("./rider.model");
const getSpecialityModel = require("./speciality.model");
const getReviewModel = require("./review.model");
const getAppointmentModel = require("./appointment.model");
const getHospitalModel = require("./hospital.model");
const getDoctorsDepartmentModel = require("./doctors_department.model")
const getLabModel = require("./lab.model");
const getLabTestModel = require("./test.model");

const getTestBookingSummaryModel = require("./test_booking_summary.model");
const getTestBookingModel = require("./test_booking.model");
const getMainCategoryModel = require("./main_category.model");
const getSubCategoryModel = require("./sub_category.model");
const getReminderModel = require("./reminder.model");
const getOfferModel = require("./offer.model");


const models = {
  Category: getCategoryModel(connection, Sequelize),
  Products: getProductModel(connection, Sequelize), 
  Store: getStoreModel(connection, Sequelize),
  User: getUserModel(connection, Sequelize),
  Doctor: getDoctorModel(connection, Sequelize),
 Payment: getPaymentModel(connection, Sequelize),
 Withdrawal: getWithdrawalModel(connection, Sequelize),
 Orders: getOrdersModel(connection, Sequelize),
 OrderItems: getOrderItemsModel(connection, Sequelize),
 Rider:getRiderModel(connection, Sequelize),
 Speciality:getSpecialityModel(connection, Sequelize),
 Review:getReviewModel(connection, Sequelize),
 Appointment:getAppointmentModel(connection, Sequelize),
 Hospital:getHospitalModel(connection, Sequelize),
 DoctorDepartment:getDoctorsDepartmentModel(connection, Sequelize),
 Lab:getLabModel(connection, Sequelize),
  LabTest:getLabTestModel(connection, Sequelize),

  TestBookingSummary:getTestBookingSummaryModel(connection, Sequelize),
  TestBooking:getTestBookingModel(connection, Sequelize),

  MainCategory:getMainCategoryModel(connection, Sequelize),
  SubCategory:getSubCategoryModel(connection, Sequelize),
  Reminder:getReminderModel(connection, Sequelize),
  Offer:getOfferModel(connection, Sequelize)
};



Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports = models;