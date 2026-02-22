router.route('/')
  .get(protect, authorize('admin', 'manager', 'receptionist'), getLeads)
  .post(protect, authorize('admin', 'manager', 'receptionist'), createLead);

router.put('/:id/convert', protect, authorize('admin', 'manager'), convertLead);