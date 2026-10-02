import React, { useState } from "react";
import {
  Copy,
  Share2,
  Users,
  IndianRupee,
  Trophy,
  Gift,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Wallet,
  MousePointerClick,
  Target,
} from "lucide-react";

const Refer = () => {
  const [copied, setCopied] = useState(false);

  // API VALUE LATER
  const referralCode = "X7K9P2M8Q4ZW";

  const referralLink = `http://localhost:3000/apply?ref=${referralCode}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareReferral = () => {
    const text = encodeURIComponent(
      `🚀 Join Xpertn Intern

Apply using my referral link:

${referralLink}

Referral Code: ${referralCode}`
    );

    window.open(
      `https://wa.me/?text=${text}`,
      "_blank"
    );
  };

  const stats = [
    {
      title: "Referral Clicks",
      value: "1,245",
      icon: MousePointerClick,
    },
    {
      title: "Registrations",
      value: "248",
      icon: Users,
    },
    {
      title: "Successful Referrals",
      value: "92",
      icon: Target,
    },
    {
      title: "Referral Points",
      value: "12,450",
      icon: Gift,
    },
    {
      title: "Total Earnings",
      value: "₹37,250",
      icon: IndianRupee,
    },
    {
      title: "Leaderboard Rank",
      value: "#14",
      icon: Trophy,
    },
  ];

  const referralHistory = [
    {
      name: "Aman Sharma",
      course: "Full Stack Development",
      status: "Completed",
      earning: "₹500",
      date: "02 Jun 2026",
    },
    {
      name: "Priya Singh",
      course: "Data Analytics",
      status: "Pending",
      earning: "₹0",
      date: "01 Jun 2026",
    },
    {
      name: "Rahul Verma",
      course: "Java Development",
      status: "Completed",
      earning: "₹500",
      date: "29 May 2026",
    },
    {
      name: "Neha Gupta",
      course: "Digital Marketing",
      status: "Completed",
      earning: "₹500",
      date: "27 May 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Referral Program
          </h1>

          <p className="text-slate-400 mt-2">
            Invite students, earn rewards, referral commissions,
            internship benefits and placement rewards.
          </p>
        </div>

        {/* HERO */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-8 mb-8">

          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8">

            <div>
              <h2 className="text-3xl font-bold mb-3">
                Earn ₹500 Per Successful Referral
              </h2>

              <p className="text-orange-100 max-w-xl">
                Share your referral link with students and earn
                commissions whenever they register, purchase courses,
                enroll in internships or join placement programs.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Trophy size={18} />
                Top 5% Referrer
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl min-w-[300px]">
              <p className="text-orange-100 text-sm">
                Referral Code
              </p>

              <h3 className="text-3xl font-bold mt-2 break-all">
                {referralCode}
              </h3>

              <p className="text-sm text-orange-100 mt-3">
                Share and start earning today.
              </p>
            </div>

          </div>

        </div>

        {/* PROGRESS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">
              Gold Partner Progress
            </h3>

            <span className="text-orange-500">
              62 / 100 Referrals
            </span>
          </div>

          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500"
              style={{ width: "62%" }}
            />
          </div>

          <p className="text-slate-400 text-sm mt-3">
            Refer 38 more students to unlock Gold Partner rewards.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-slate-400 text-sm">
                      {item.title}
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                      {item.value}
                    </h3>
                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <Icon
                      size={28}
                      className="text-orange-500"
                    />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* EARNINGS */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <Wallet className="text-green-500 mb-3" />

            <p className="text-slate-400 text-sm">
              Available Balance
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₹22,500
            </h3>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <Clock className="text-yellow-500 mb-3" />

            <p className="text-slate-400 text-sm">
              Pending Balance
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₹7,500
            </h3>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <IndianRupee className="text-orange-500 mb-3" />

            <p className="text-slate-400 text-sm">
              Withdrawn
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₹14,750
            </h3>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center">
            <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold">
              Withdraw Earnings
            </button>
          </div>

        </div>

        {/* REFERRAL LINK */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

          <h3 className="text-xl font-semibold mb-4">
            Your Referral Link
          </h3>

          <div className="flex flex-col lg:flex-row gap-4">

            <input
              readOnly
              value={referralLink}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none"
            />

            <button
              onClick={copyLink}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <Copy size={18} />
              {copied ? "Copied" : "Copy Link"}
            </button>

            <button
              onClick={shareReferral}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              <Share2 size={18} />
              WhatsApp
            </button>

          </div>

        </div>

        {/* LEVELS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8">

          <h3 className="text-xl font-semibold mb-5">
            Referral Levels
          </h3>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
              <Star className="text-yellow-500 mb-3" />
              <h4 className="font-bold text-lg">
                Bronze Partner
              </h4>
              <p className="text-slate-400 mt-2">
                0 - 25 Referrals
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-5 border border-orange-500">
              <Trophy className="text-orange-500 mb-3" />
              <h4 className="font-bold text-lg">
                Silver Partner
              </h4>
              <p className="text-slate-400 mt-2">
                25 - 100 Referrals
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl p-5 border border-green-500">
              <Gift className="text-green-500 mb-3" />
              <h4 className="font-bold text-lg">
                Gold Partner
              </h4>
              <p className="text-slate-400 mt-2">
                100+ Referrals
              </p>
            </div>

          </div>

        </div>

        {/* HISTORY */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <div className="p-6 border-b border-slate-800">
            <h3 className="text-xl font-semibold">
              Referral History
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-slate-950">
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Course</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Earning</th>
                  <th className="text-left p-4">Date</th>
                </tr>
              </thead>

              <tbody>

                {referralHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800"
                  >
                    <td className="p-4">{item.name}</td>

                    <td className="p-4">{item.course}</td>

                    <td className="p-4">
                      {item.status === "Completed" ? (
                        <span className="flex items-center gap-2 text-green-500">
                          <CheckCircle size={16} />
                          Completed
                        </span>
                      ) : (
                        <span className="text-yellow-500">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-4 font-semibold">
                      {item.earning}
                    </td>

                    <td className="p-4 text-slate-400">
                      {item.date}
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Refer;