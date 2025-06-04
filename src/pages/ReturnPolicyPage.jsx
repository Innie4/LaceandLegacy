import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  Package,
  Clock,
  AlertCircle,
  CheckCircle2,
  Download,
  Printer,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
} from 'lucide-react';

const ReturnPolicyPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const policySections = [
    {
      title: 'Return Window',
      content: [
        'Items must be returned within 30 days of delivery',
        'Return shipping label must be used within 14 days of creation',
        'Holiday purchases have extended return window until January 15th',
      ],
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: 'Condition Requirements',
      content: [
        'Items must be unworn and unwashed',
        'All original tags must be attached',
        'Items must be in original packaging',
        'No signs of wear, damage, or alteration',
      ],
      icon: <Package className="h-6 w-6" />,
    },
    {
      title: 'Return Process',
      content: [
        'Log into your account and go to Order History',
        'Select the order you wish to return',
        'Choose items to return and reason for return',
        'Print return label or request email copy',
        'Package items securely with return label',
        'Drop off at carrier location or schedule pickup',
      ],
      icon: <RefreshCw className="h-6 w-6" />,
    },
    {
      title: 'Refund Timeline',
      content: [
        'Refunds are processed within 5-7 business days of receiving return',
        'Original payment method will be credited',
        'Shipping costs are non-refundable unless item was defective',
        'International returns may take 2-3 weeks for processing',
      ],
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  const exclusions = [
    'Final sale items marked with "No Returns"',
    'Items purchased during clearance events',
    'Custom or personalized items',
    'Items without original tags or packaging',
    'Items showing signs of wear or damage',
  ];

  const returnStatuses = [
    {
      status: 'Return Initiated',
      description: 'Return request has been submitted',
      timeline: 'Day 1',
    },
    {
      status: 'Return Label Generated',
      description: 'Return shipping label is ready',
      timeline: 'Day 1-2',
    },
    {
      status: 'Return in Transit',
      description: 'Package is on its way back to us',
      timeline: 'Day 2-7',
    },
    {
      status: 'Return Received',
      description: 'Package has arrived at our facility',
      timeline: 'Day 7-10',
    },
    {
      status: 'Refund Processed',
      description: 'Refund has been issued to original payment method',
      timeline: 'Day 10-15',
    },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 font-mono mb-4">
            Return & Exchange Policy
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            We want you to love your vintage finds. If you need to return or
            exchange an item, here's everything you need to know.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 mb-12">
          {policySections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl border-2 border-amber-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-full">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-amber-900 font-mono">
                    {section.title}
                  </h2>
                </div>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="p-2 text-amber-600 hover:text-amber-700 transition-colors duration-300"
                >
                  {expandedSection === section.title ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>
              {expandedSection === section.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4">
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-amber-700"
                        >
                          <ArrowRight className="h-5 w-5 text-amber-600 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Return Timeline */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-amber-900 font-mono mb-6">
            Return Timeline
          </h2>
          <div className="space-y-6">
            {returnStatuses.map((status, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      index === returnStatuses.length - 1
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-amber-300 text-amber-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < returnStatuses.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-amber-300" />
                  )}
                </div>
                <div>
                  <p className="text-amber-900 font-medium">
                    {status.status}
                  </p>
                  <p className="text-sm text-amber-600">
                    {status.description}
                  </p>
                  <p className="text-sm text-amber-500 mt-1">
                    {status.timeline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-900 font-mono">
              Return Exclusions
            </h2>
          </div>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-amber-700"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-medium text-sm">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border-2 border-amber-300 rounded-lg text-amber-900 hover:border-amber-600 transition-colors duration-300"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Policy
          </button>
          <button className="inline-flex items-center px-4 py-2 border-2 border-amber-300 rounded-lg text-amber-900 hover:border-amber-600 transition-colors duration-300">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>

        {/* Need Help */}
        <div className="bg-white rounded-xl border-2 border-amber-200 p-8">
          <h2 className="text-2xl font-bold text-amber-900 font-mono mb-6">
            Need Help with Your Return?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 border-2 border-amber-100 rounded-lg">
              <Mail className="h-6 w-6 text-amber-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-amber-900 mb-1">
                  Email Support
                </h3>
                <p className="text-amber-600">
                  returns@throwbacktee.com
                </p>
                <p className="text-sm text-amber-500 mt-1">
                  Response within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-amber-100 rounded-lg">
              <Phone className="h-6 w-6 text-amber-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-amber-900 mb-1">
                  Call Support
                </h3>
                <p className="text-amber-600">
                  +1 (555) 123-4567
                </p>
                <p className="text-sm text-amber-500 mt-1">
                  Mon-Fri, 9am-6pm EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage; 