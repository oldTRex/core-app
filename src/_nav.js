import React from "react";
import { useContext , useState } from "react";
import { userContext } from "contexts/user/user.context";
 

const defaultNavigation = {
  items: [
    {
      name: 'داشبورد',
      url: '/dashboard',
      icon: 'cui-dashboard',
      children: [
        {
          name: 'کاربران',
          url: '/dashboard/dashboard_users',
        }, {
          name: 'مارکت ها',
          url: '/dashboard/dashboard_markets',
        },
      ]

    },
    {
      name: 'اطلاع رسانی',
      url: '/announcement',
      icon: 'fa fa-envelope',
      children: [
        {
          name: 'بلاگ',
          url: '/announcement/blog',
          icon: 'edit',
        },
        {
          name: 'رویداد',
          url: '/announcement/events',
          icon: 'edit',
        },
        {
          name: 'نوتیفیکیشن',
          url: '/announcement/notifications',
          icon: 'edit',
        },

        {
          name: 'مدیریت  پیامک',
          url: '/announcement/sms',
          icon: 'edit',
        },
        {
          name: 'خبرنامه',
          url: '/announcement/newsletter',
          icon: 'edit',
        },
      ]
    },

    {
      name: 'تنظیمات',
      url: '/settings',
      icon: 'fa fa-wrench',
      children: [
        {
          name: 'تنظیمات اپلیکیشن',
          url: '/settings/application',
        },
        {
          name: 'تنظیمات فروشگاه',
          url: '/settings/markets',
        },

        {
          name: 'تنظیمات کلی',
          url: '/settings/general',
        },


      ]
    },


    {
      name: 'پشتیبانی',
      url: '/suppport',
      icon: 'fa fa-support',
      children: [
        {
          name: 'نظرات سایت',
          url: '/support/site_comments',
          icon: 'edit',
        },
        {
          name: 'نظرات اپلیکیشن',
          url: '/support/app_comments',
          icon: 'edit',
        },

        {
          name: 'تیکت',
          url: '/support/tickets',
          icon: 'edit',
        },
        {
          name: 'چت',
          url: '/support/chat',
          icon: 'edit',
        },
      ]
    },


    {
      name: 'کاربران',
      url: '/users',
      icon: 'fa fa-user-o',
      children: [
        {
          name: 'اطلاعات کاربران',
          url: '/users/users_information',
        },

        {
          name: 'گزارشات کاربران',
          url: '/users/users_reports',
        },
      ]

    },

    {
      name: 'فروشگاه',
      url: '/market',
      icon: 'fa fa-shopping-cart',
      children: [
        {
          name: 'سفارشات',
          url: '/market/invoices',
        },

        {
          name: 'ارشیو',
          url: '/market/archive',
        },
        {
          name: 'گزارشات',
          url: '/market/reports',
        },
      ]

    },

    {
      name:'داشبرد مارکت',
      url:'/market/dashboard',
      icon:'cui-dashboard'
    },
    {
      name:'تیکت',
      url:'/market/ticket',
      icon:'fa fa-ticket'
    },

    {
      name:'چت',
      url:'/market/chat',
      icon:'fa fa-phone'
    },

    
    {
      name:'مشتری ها',
      url:'/market/customers',
      icon:'fa fa-phone'
    },

    {
      name:'مدیریت تگ head',
      url:'/head',
      icon:'fa fa-tag'
    },
  ],
};


export default defaultNavigation
